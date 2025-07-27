# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, admin, dashboard, report, transaction, users

app = FastAPI()

# تنظیم CORS برای ارتباط با فرانت‌اند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # آدرس فرانت‌اند
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# اتصال مسیرها
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(report.router, prefix="/report", tags=["report"])
app.include_router(transaction.router, prefix="/transaction", tags=["transaction"])
app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to GJBMS API"}