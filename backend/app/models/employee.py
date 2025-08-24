from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.db import Base

class Employee(Base):
    __tablename__ = "employees"
    employee_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(200), nullable=False)
    role = Column(String(50), nullable=False)  # "admin" | "user"
    phone = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
