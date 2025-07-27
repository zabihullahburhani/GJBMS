from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from app.models import SessionLocal, Customer
from app.blockchain.blockchain import Blockchain
import datetime

router = APIRouter()
templates = Jinja2Templates(directory="frontend/pages")

bc = Blockchain()

@router.get("/customers", response_class=HTMLResponse)
async def customer_page(request: Request):
    return templates.TemplateResponse("customers.html", {"request": request})

@router.post("/customers")
async def add_customer(request: Request, full_name: str = Form(...), phone: str = Form(...), address: str = Form(None)):
    db = SessionLocal()
    new_c = Customer(full_name=full_name, phone=phone, address=address, created_at=datetime.datetime.utcnow())
    db.add(new_c)
    db.commit()
    db.refresh(new_c)
    db.close()

    bc.add_block(f"Added customer: {new_c.full_name}")

    return RedirectResponse(url="/customers", status_code=302)
