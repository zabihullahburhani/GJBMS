from sqlalchemy import Column, Integer, DECIMAL, DateTime
from .db import Base

class ShopBalance(Base):
    __tablename__ = "shop_balance"

    balance_id = Column(Integer, primary_key=True, index=True)
    gold_balance_grams = Column(DECIMAL, nullable=False)
    cash_balance_usd = Column(DECIMAL, nullable=False)
    updated_at = Column(DateTime, nullable=False)
