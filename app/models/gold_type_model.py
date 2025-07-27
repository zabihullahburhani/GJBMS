from sqlalchemy import Column, Integer, String, Text
from .db import Base

class GoldType(Base):
    __tablename__ = "gold_types"

    gold_type_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
