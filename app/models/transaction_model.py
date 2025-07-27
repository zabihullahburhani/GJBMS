from sqlalchemy import Column, Integer, DECIMAL, DateTime, ForeignKey, Text
from .db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    txn_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
    gold_type_id = Column(Integer, ForeignKey("gold_types.gold_type_id"))
    grams = Column(DECIMAL, nullable=False)
    rate_per_gram = Column(DECIMAL, nullable=False)
    total_usd = Column(DECIMAL, nullable=False)
    txn_date = Column(DateTime, nullable=False)
    notes = Column(Text)
