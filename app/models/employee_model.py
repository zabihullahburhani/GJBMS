from sqlalchemy import Column, Integer, String, DateTime
from .db import Base

class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    phone = Column(String)
    created_at = Column(DateTime)
