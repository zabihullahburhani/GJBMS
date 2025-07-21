from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    
#    role: str = "user"  # پیش‌فرض نقش کاربر
class UserInDB(User):
    id: int
    role: str

# class UserCreate(User):
class Token(BaseModel):
    access_token: str
    token_type: str
