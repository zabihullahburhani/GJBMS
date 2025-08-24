from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.db import SessionLocal
from app.core.security import verify_password, hash_password, create_access_token, decode_token
from app.models.employee import Employee
from app.models.login import Login
from app.schemas.auth import LoginReq, RegisterReq, MeRes
from app.core.config import settings

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/login")
def login(payload: LoginReq, db: Session = Depends(get_db)):
    cred = db.query(Login).filter(Login.username == payload.username).first()
    if not cred or not verify_password(payload.password, cred.password_hash):
        raise HTTPException(status_code=401, detail="نام کاربری یا رمز عبور نادرست است")
    cred.last_login = datetime.utcnow(); db.add(cred); db.commit()
    role = cred.employee.role
    token = create_access_token(sub=str(cred.employee_id), role=role)
    return {"access_token": token, "token_type": "bearer", "role": role}

@router.post("/register")
def register(payload: RegisterReq, db: Session = Depends(get_db)):
    if not settings.ALLOW_OPEN_REGISTRATION:
        raise HTTPException(status_code=403, detail="ثبت‌نام غیرفعال است")
    if db.query(Login).filter(Login.username == payload.username).first():
        raise HTTPException(status_code=409, detail="نام کاربری تکراری است")
    emp = Employee(full_name=payload.full_name, role=payload.role, phone=payload.phone)
    db.add(emp); db.flush()
    db.add(Login(employee_id=emp.employee_id, username=payload.username, password_hash=hash_password(payload.password)))
    db.commit()
    return {"ok": True}

@router.get("/me", response_model=MeRes)
def me(authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="توکن ارائه نشده")
    data = decode_token(authorization.split(" ",1)[1])
    if not data: raise HTTPException(status_code=401, detail="توکن نامعتبر")
    emp = db.query(Employee).filter(Employee.employee_id == int(data["sub"])).first()
    if not emp: raise HTTPException(status_code=404, detail="کاربر یافت نشد")
    return MeRes(employee_id=emp.employee_id, full_name=emp.full_name, role=emp.role)
