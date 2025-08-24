from pydantic import BaseModel, Field

class LoginReq(BaseModel):
    username: str
    password: str

class RegisterReq(BaseModel):
    full_name: str
    phone: str | None = None
    role: str = Field(pattern="^(admin|user)$")
    username: str
    password: str

class MeRes(BaseModel):
    employee_id: int
    full_name: str
    role: str
