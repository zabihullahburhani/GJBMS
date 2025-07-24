from fastapi import APIRouter, Query, Request , Cookie
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from typing import List, Optional
from datetime import datetime
from app.utils.token import verify_access_token
from database.database import database, metadata, engine, activity_logs


templates = Jinja2Templates(directory="templates")
router = APIRouter()

# ساخت جدول (فقط یکبار نیاز است)
metadata.create_all(engine)

class LogIn(BaseModel):
    user_id: str
    action: str
    details: Optional[str] = None

class LogOut(BaseModel):
    id: int
    user_id: str
    action: str
    timestamp: datetime
    details: Optional[str]

@router.post("/", response_model=LogOut)
async def create_log(log: LogIn):
    now = datetime.utcnow()
    query = activity_logs.insert().values(
        user_id=log.user_id,
        action=log.action,
        timestamp=now,
        details=log.details,
    )
    last_record_id = await database.execute(query)
    return {**log.dict(), "id": last_record_id, "timestamp": now}

@router.get("/", response_model=List[LogOut])
async def get_logs(
    action: Optional[str] = Query(None, description="فیلتر بر اساس نام اکشن"),
    start_date: Optional[datetime] = Query(None, description="تاریخ شروع"),
    end_date: Optional[datetime] = Query(None, description="تاریخ پایان"),
):
    query = activity_logs.select()
    if action:
        query = query.where(activity_logs.c.action.ilike(f"%{action}%"))
    if start_date:
        query = query.where(activity_logs.c.timestamp >= start_date)
    if end_date:
        query = query.where(activity_logs.c.timestamp <= end_date)
    query = query.order_by(activity_logs.c.timestamp.desc())
    return await database.fetch_all(query)


# نمایش لاگ‌های ادمین با فیلتر بر اساس تاریخ و کاربر
# این تابع فقط برای ادمین‌ها قابل دسترسی است
@router.get("/admin/logs", response_class=HTMLResponse)
async def view_logs(request: Request, access_token: Optional[str] = Cookie(None)):
    if not access_token:
        # کوکی موجود نیست → کاربر را بفرست به صفحه لاگین
        return RedirectResponse(url="/", status_code=303)

    user_data = verify_access_token(access_token)
    if not user_data or user_data.get("role") != "admin":
        return RedirectResponse(url="/", status_code=303)

    query = activity_logs.select().order_by(activity_logs.c.timestamp.desc())
    logs = await database.fetch_all(query)

    return templates.TemplateResponse("admin_logs.html", {
        "request": request,
        "logs": logs
    })

