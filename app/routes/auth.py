from fastapi import APIRouter, Request, Form, Cookie
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from app.models.db import get_db_connection
from app.utils.security import hash_password, verify_password
from app.utils.token import create_access_token, verify_access_token

templates = Jinja2Templates(directory="templates")
router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@router.post("/login")
async def login(request: Request, username: str = Form(...), password: str = Form(...)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT password, role FROM users WHERE username=?", (username,))
    user = cur.fetchone()
    conn.close()

    if user and verify_password(password, user["password"]):
        role = user["role"]

        # ساخت توکن
        access_token = create_access_token(data={"sub": username, "role": role})
        
        # هدایت بر اساس نقش
        if role == "admin":
            response = RedirectResponse(url="/admin/dashboard", status_code=303)
        else:
            response = RedirectResponse(url="/user/dashboard", status_code=303)
        
        # ذخیره توکن و یوزرنیم در کوکی
        response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=1800)  # 30 min
        response.set_cookie(key="username", value=username, httponly=True, max_age=1800)
        return response

    else:
        return templates.TemplateResponse("login.html", {"request": request, "error": "Invalid username or password"})

@router.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@router.post("/register")
async def register(request: Request, username: str = Form(...), password: str = Form(...)):
    hashed = hash_password(password)
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, hashed, "user"))
        conn.commit()
        conn.close()
        return templates.TemplateResponse("login.html", {"request": request, "success": "Registration successful! Please log in."})
    except:
        conn.close()
        return templates.TemplateResponse("register.html", {"request": request, "error": "Username already exists."})

@router.get("/admin/dashboard", response_class=HTMLResponse)
async def admin_dashboard(request: Request, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if user and user["role"] == "admin":
        return templates.TemplateResponse("admin_dashboard.html", {"request": request, "username": user["username"]})
    else:
        return RedirectResponse(url="/", status_code=303)

@router.get("/user/dashboard", response_class=HTMLResponse)
async def user_dashboard(request: Request, access_token: str = Cookie(None)):
    user = verify_access_token(access_token)
    if user and user["role"] == "user":
        return templates.TemplateResponse("user_dashboard.html", {"request": request, "username": user["username"]})
    else:
        return RedirectResponse(url="/", status_code=303)
