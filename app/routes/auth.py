from fastapi import APIRouter, Request, Form, Cookie
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from app.utils.security import hash_password, verify_password
from app.utils.token import create_access_token, verify_access_token
from app.models.schemas import User, Token
import sqlite3

templates = Jinja2Templates(directory="templates")
router = APIRouter()

# تابع گرفتن کانکشن دیتابیس
def get_db():
    conn = sqlite3.connect('database/database_pasa.db')
    conn.row_factory = sqlite3.Row
    return conn

# نمایش صفحه لاگین
@router.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# پردازش لاگین
@router.post("/login")
async def login(request: Request, username: str = Form(...), password: str = Form(...)):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT password_hash, role, Full_name FROM logins WHERE username=?", (username,))
    user = cur.fetchone()
    conn.close()

    if user and verify_password(password, user["password_hash"]):
        role = user["role"]
        access_token = create_access_token(data={"sub": username, "role": role})

        if role == "admin":
            response = RedirectResponse(url="/admin/dashboard", status_code=303)
        else:
            response = RedirectResponse(url="/user/dashboard", status_code=303)

        response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=1800)
        response.set_cookie(key="username", value=username, httponly=True, max_age=1800)
        return response

    return templates.TemplateResponse("dmin_dashboard.html", {"request": request, "error": "Invalid username or password"})

# نمایش صفحه ثبت‌نام
@router.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

# پردازش ثبت‌نام
@router.post("/register")
async def register(request: Request, full_name: str = Form(...), username: str = Form(...), password: str = Form(...)):
    hashed = hash_password(password)
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO logins (Full_name, username, password_hash, role) VALUES (?, ?, ?, ?)",
                    (full_name, username, hashed, "user"))
        conn.commit()
        conn.close()
        return templates.TemplateResponse("login.html", {"request": request, "success": "Registration successful! Please log in."})
    except sqlite3.IntegrityError:
        conn.close()
        return templates.TemplateResponse("register.html", {"request": request, "error": "Username already exists."})

# داشبورد مدیر
@router.get("/admin/dashboard", response_class=HTMLResponse)
async def admin_dashboard(request: Request, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if user and user["role"] == "admin":
        return templates.TemplateResponse("admin_dashboard.html", {"request": request, "username": user["sub"]})
    else:
        return RedirectResponse(url="/", status_code=303)

# داشبورد کاربر عادی
@router.get("/user/dashboard", response_class=HTMLResponse)
async def user_dashboard(request: Request, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if user and user["role"] == "user":
        return templates.TemplateResponse("user_dashboard.html", {"request": request, "username": user["sub"]})
    else:
        return RedirectResponse(url="/", status_code=303)

# صفحه فراموشی رمز
@router.get("/forgot", response_class=HTMLResponse)
async def forgot_page(request: Request):
    return templates.TemplateResponse("forgot.html", {"request": request})

@router.post("/forgot")
async def forgot(request: Request, username: str = Form(...)):
    new_password = "newpass123"
    hashed = hash_password(new_password)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE logins SET password_hash=? WHERE username=?", (hashed, username))
    conn.commit()
    conn.close()
    message = f"رمز جدید برای {username}: {new_password} (بعداً تغییر دهید)"
    return templates.TemplateResponse("forgot.html", {"request": request, "message": message})
