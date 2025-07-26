
from app.routes import auth
from app.routes import employee  # برای شروع

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates



app = FastAPI()

# برای فایل‌های استاتیک (CSS, JS, فونت)
# برای قالب‌های HTML
templates = Jinja2Templates(directory="templates")

# نمایش صفحه لاگین
@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})





# اضافه کردن static files برای css و js
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)
# include router ها
app.include_router(employee.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Gold and Jewelry Business Management System!"}







