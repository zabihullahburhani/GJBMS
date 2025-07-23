from fastapi import APIRouter, Cookie
from fastapi.responses import JSONResponse
from fastapi import Depends
from app.utils.token import verify_access_token

from app.models.transaction import Transaction
from database.database import get_db_connection

router = APIRouter()

@router.post("/transactions/")
async def create_transaction(item: Transaction):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO transactions 
        (name, phone, date, detail, gold_total, gold_remain, dollar_total, dollar_remain, balance_dollar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (item.name, item.phone, item.date, item.detail,
          item.gold_total, item.gold_remain, item.dollar_total, item.dollar_remain, item.balance_dollar))
    conn.commit()
    conn.close()
    return {"message": "✅ Transaction added"}

@router.get("/transactions/")
async def list_transactions():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM transactions")
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]



@router.put("/transactions/{transaction_id}")
async def update_transaction(transaction_id: int, item: Transaction, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user["role"] != "admin":
        return JSONResponse(status_code=403, content={"message": "❌ Unauthorized"})
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        UPDATE transactions 
        SET name=?, phone=?, date=?, detail=?, gold_total=?, gold_remain=?, dollar_total=?, dollar_remain=?, balance_dollar=?
        WHERE id=?
    """, (item.name, item.phone, item.date, item.detail,
          item.gold_total, item.gold_remain, item.dollar_total, item.dollar_remain, item.balance_dollar,
          transaction_id))
    conn.commit()
    conn.close()
    return {"message": f"✅ Transaction {transaction_id} updated"}


@router.delete("/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if not user or user["role"] != "admin":
        return JSONResponse(status_code=403, content={"message": "❌ Unauthorized"})
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM transactions WHERE id=?", (transaction_id,))
    conn.commit()
    conn.close()
    return {"message": f"✅ Transaction {transaction_id} deleted"}




@router.get("/transactions/search/")
async def search_transactions(name: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    if name:
        cur.execute("SELECT * FROM transactions WHERE name LIKE ?", ('%' + name + '%',))
    else:
        cur.execute("SELECT * FROM transactions")
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]
