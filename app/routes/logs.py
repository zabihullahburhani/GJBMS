from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database.database import database, metadata, engine, activity_logs

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
