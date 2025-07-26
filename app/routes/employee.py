from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import db, schemas
from app.models.db import SessionLocal

router = APIRouter()

# Dependency
def get_db():
    db_conn = SessionLocal()
    try:
        yield db_conn
    finally:
        db_conn.close()

@router.post("/employees/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = db.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@router.get("/employees/", response_model=list[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(db.Employee).offset(skip).limit(limit).all()

@router.get("/employees/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(db.Employee).filter(db.Employee.employee_id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
