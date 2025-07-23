from pydantic import BaseModel

class Transaction(BaseModel):
    name: str
    phone: str
    date: str
    detail: str
    gold_total: float
    gold_remain: float
    dollar_total: float
    dollar_remain: float
    balance_dollar: float
