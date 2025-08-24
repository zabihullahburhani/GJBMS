from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.db import Base, engine, SessionLocal
from app.core.security import hash_password
from app.models.employee import Employee
from app.models.login import Login
from app.api.v1.auth import router as auth_router

app = FastAPI(title=settings.PROJECT_NAME)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def seed_users():
    db: Session = SessionLocal()
    try:
        # admin / 123
        admin_login = db.query(Login).filter(Login.username=="admin").first()
        if not admin_login:
            admin = Employee(full_name="System Admin", role="admin", phone=None)
            db.add(admin); db.flush()
            db.add(Login(employee_id=admin.employee_id, username="admin", password_hash=hash_password("123")))
            db.commit()
            print("Seeded: admin / 123")
        # user / 123
        user_login = db.query(Login).filter(Login.username=="user").first()
        if not user_login:
            u = Employee(full_name="Default User", role="user", phone=None)
            db.add(u); db.flush()
            db.add(Login(employee_id=u.employee_id, username="user", password_hash=hash_password("123")))
            db.commit()
            print("Seeded: user / 123")
    finally:
        db.close()
seed_users()

api = settings.API_V1_STR
app.include_router(auth_router, prefix=f"{api}/auth", tags=["auth"])

@app.get("/")
def root(): return {"status":"ok","name":settings.PROJECT_NAME}
