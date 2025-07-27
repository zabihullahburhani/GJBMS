from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.models.db import SessionLocal
from app.models.employee_model import Employee
from datetime import datetime

router = APIRouter()

@router.post("/add-employee", response_class=HTMLResponse)
async def add_employee(
    request: Request,
    full_name: str = Form(...),
    role: str = Form(...),
    phone: str = Form(...)
):
    db: Session = SessionLocal()
    employee = Employee(
        full_name=full_name,
        role=role,
        phone=phone,
        created_at=datetime.now()
    )
    db.add(employee)
    db.commit()
    return HTMLResponse("<h3>✅ کارمند با موفقیت اضافه شد</h3>")


@router.get("/employees")
async def get_employees():
    db = SessionLocal()
    employees = db.query(Employee).all()
    return [
        {"employee_id": e.employee_id, "full_name": e.full_name, "role": e.role, "phone": e.phone, "created_at": e.created_at}
        for e in employees
    ]
