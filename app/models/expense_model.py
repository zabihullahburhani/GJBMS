from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey, Text
from .db import Base

class ShopExpense(Base):
    __tablename__ = "shop_expenses"

    expense_id = Column(Integer, primary_key=True, index=True)
    expense_type = Column(String, nullable=False)
    amount = Column(DECIMAL, nullable=False)
    expense_date = Column(DateTime, nullable=False)
    description = Column(Text)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
