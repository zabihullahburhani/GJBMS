from fastapi import APIRouter, Request, Cookie
from fastapi.responses import JSONResponse, RedirectResponse
from typing import Optional
from app.utils.token import verify_access_token
from database.database import database
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/admin/dashboard/income-today")
async def get_income_today(access_token: Optional[str] = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user.get("role") != "admin":
        return RedirectResponse("/", status_code=303)

    today = datetime.utcnow().date()
    query = "SELECT SUM(amount) FROM transactions WHERE DATE(timestamp) = :today"
    result = await database.fetch_one(query=query, values={"today": today})
    return {"income_today": result[0] if result[0] else 0}

@router.get("/admin/dashboard/income-yesterday")
async def get_income_yesterday(access_token: Optional[str] = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user.get("role") != "admin":
        return RedirectResponse("/", status_code=303)

    yesterday = datetime.utcnow().date() - timedelta(days=1)
    query = "SELECT SUM(amount) FROM transactions WHERE DATE(timestamp) = :yesterday"
    result = await database.fetch_one(query=query, values={"yesterday": yesterday})
    return {"income_yesterday": result[0] if result[0] else 0}

@router.get("/admin/dashboard/sales-today")
async def get_sales_today(access_token: Optional[str] = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user.get("role") != "admin":
        return RedirectResponse("/", status_code=303)

    today = datetime.utcnow().date()
    query = "SELECT hour(timestamp) as hour, SUM(amount) FROM transactions WHERE DATE(timestamp) = :today GROUP BY hour"
    rows = await database.fetch_all(query=query, values={"today": today})
    # خروجی برای نمودار: لیست ساعت و فروش
    data = [{"hour": row[0], "total": row[1]} for row in rows]
    return data

@router.get("/admin/dashboard/top-customers")
async def get_top_customers(access_token: Optional[str] = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user.get("role") != "admin":
        return RedirectResponse("/", status_code=303)

    today = datetime.utcnow().date()
    query = """
    SELECT customer_id, SUM(amount) as total
    FROM transactions
    WHERE DATE(timestamp) = :today
    GROUP BY customer_id
    ORDER BY total DESC
    LIMIT 5
    """
    rows = await database.fetch_all(query=query, values={"today": today})
    data = [{"customer_id": row[0], "total": row[1]} for row in rows]
    return data

@router.get("/admin/dashboard/recent-transactions")
async def get_recent_transactions(access_token: Optional[str] = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user.get("role") != "admin":
        return RedirectResponse("/", status_code=303)

    today = datetime.utcnow().date()
    query = """
    SELECT id, customer_id, amount, timestamp
    FROM transactions
    WHERE DATE(timestamp) = :today
    ORDER BY timestamp DESC
    LIMIT 10
    """
    rows = await database.fetch_all(query=query, values={"today": today})
    data = [{"id": row[0], "customer_id": row[1], "amount": row[2], "timestamp": row[3]} for row in rows]
    return data
