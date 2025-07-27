# app/routes/admin.py
from fastapi import APIRouter, Depends
from app.blockchain.blockchain import blockchain

router = APIRouter()

@router.get("/logs")
async def get_logs():
    return blockchain.chain