# GJBMS/app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.utils.security import hash_password, verify_password
from app.models.db import get_db
from app.models.user import Login

router = APIRouter()

SECRET_KEY = "your-secret-key"  # باید در config.py ذخیره شود
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(Login).filter(Login.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # بررسی نقش کاربر
    employee = db.query(Employee).filter(Employee.employee_id == user.employee_id).first()
    role = employee.role if employee else "user"
    
    access_token = create_access_token(data={"sub": user.username, "role": role})
    user.last_login = datetime.utcnow()
    db.commit()
    return {"access_token": access_token, "token_type": "bearer", "role": role}