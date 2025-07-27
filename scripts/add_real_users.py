from app.models.db import SessionLocal
from app.models.log_model import Login
from datetime import datetime
import hashlib

db = SessionLocal()

# کاربر و پسورد
users = [
    {"username": "admin", "password": "admin", "employee_id": 1},
    {"username": "user", "password": "user", "employee_id": 2}
]

for u in users:
    hashed = hashlib.sha256(u["password"].encode()).hexdigest()
    login = Login(
        employee_id=u["employee_id"],
        username=u["username"],
        password_hash=hashed,
        last_login=datetime.now()
    )
    db.add(login)

db.commit()
print("✅ کاربران واقعی اضافه شدند به database_pasa.db")
