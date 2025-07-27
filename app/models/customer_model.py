from sqlalchemy import Column, Integer, String, Text, DateTime
from .db import Base

class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(Text)
    created_at = Column(DateTime)
