from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(p: str) -> str: return pwd_context.hash(p)
def verify_password(p: str, h: str) -> bool: return pwd_context.verify(p, h)

def create_access_token(sub: str, role: str):
    exp = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": sub, "role": role, "exp": exp}, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

def decode_token(token: str):
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
    except JWTError:
        return None
