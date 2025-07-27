# app/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.db import get_db
from app.models.user import Customer
from pydantic import BaseModel

router = APIRouter()

class CustomerCreate(BaseModel):
    full_name: str
    phone: str | None
    address: str | None

@router.post("/customers")
async def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@router.get("/customers")
async def get_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()