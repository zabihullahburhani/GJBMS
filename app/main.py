from fastapi import FastAPI
from app.routes import auth
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# اضافه کردن static files برای css و js
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Gold and Jewelry Business Management System!"}
