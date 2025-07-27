from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LoginCreate(BaseModel):
    username: str
    password: str  # رمز خام برای ثبت

class LoginOut(BaseModel):
    login_id: int
    username: str
    employee_id: int
    last_login: Optional[datetime]

    class Config:
        orm_mode = True



from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CustomerCreate(BaseModel):
    full_name: str
    phone: str
    address: Optional[str]
    created_at: datetime

class EmployeeCreate(BaseModel):
    full_name: str
    role: str
    phone: str
    created_at: datetime

class ShopExpenseCreate(BaseModel):
    expense_type: str
    amount: float
    expense_date: datetime
    description: Optional[str]
    employee_id: int

class ShopBalanceCreate(BaseModel):
    gold_balance_grams: float
    cash_balance_usd: float
    updated_at: datetime

class GoldTypeCreate(BaseModel):
    name: str
    description: Optional[str]

class GoldRateCreate(BaseModel):
    gold_type_id: int
    rate_per_gram: float
    updated_at: datetime

class TransactionCreate(BaseModel):
    customer_id: int
    employee_id: int
    gold_type_id: int
    grams: float
    rate_per_gram: float
    total_usd: float
    txn_date: datetime
    notes: Optional[str]
