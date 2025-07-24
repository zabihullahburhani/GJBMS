



from fastapi import APIRouter, HTTPException, Cookie
from typing import Optional

router = APIRouter()

# داده‌های تستی (mock data)
fake_sales_today = [100, 200, 150, 300, 250, 400, 350]  # مثلاً فروش هر ساعت امروز
fake_top_customers = [
    {"name": "Alice", "total": 500},
    {"name": "Bob", "total": 400},
    {"name": "Charlie", "total": 300}
]
fake_recent_transactions = [
    {"id": 1, "customer": "Alice", "amount": 100, "time": "10:00"},
    {"id": 2, "customer": "Bob", "amount": 200, "time": "10:30"},
    {"id": 3, "customer": "Charlie", "amount": 150, "time": "11:00"}
]
fake_income = {
    "today": 1000,
    "yesterday": 900
}

@router.get("/dashboard/sales-today")
async def get_sales_today(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"sales": fake_sales_today}

@router.get("/dashboard/top-customers")
async def get_top_customers(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"customers": fake_top_customers}

@router.get("/dashboard/recent-transactions")
async def get_recent_transactions(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"transactions": fake_recent_transactions}

@router.get("/dashboard/income")
async def get_income(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return fake_income
