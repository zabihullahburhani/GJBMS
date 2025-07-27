from sqlalchemy import Column, Integer, DECIMAL, DateTime, ForeignKey
from .db import Base

class GoldRate(Base):
    __tablename__ = "gold_rates"

    rate_id = Column(Integer, primary_key=True, index=True)
    gold_type_id = Column(Integer, ForeignKey("gold_types.gold_type_id"))
    rate_per_gram = Column(DECIMAL, nullable=False)
    updated_at = Column(DateTime, nullable=False)
