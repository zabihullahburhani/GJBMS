from pydantic import BaseModel
from typing import Optional

# ✅ مدل توکن (برای پاسخ login)
class Token(BaseModel):
    access_token: str
    token_type: str

# ✅ مدل کارمند (Employee)
class EmployeeBase(BaseModel):
    full_name: str
    phone: str
    hire_date: str
    nic: str
    termination_date: Optional[str] = None
    guarantor: str
    salary: Optional[float] = None
    status: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    employee_id: int

    class Config:
        orm_mode = True

# ✅ مدل کاربر (User)
class User(BaseModel):
    id: Optional[int]
    username: str
    password: str
    role: str

    class Config:
        orm_mode = True
