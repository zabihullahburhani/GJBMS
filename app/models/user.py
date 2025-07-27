from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Customer(Base):
    __tablename__ = "customers"
    customer_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    phone = Column(String)
    address = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Employee(Base):
    __tablename__ = "employees"
    employee_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Login(Base):
    __tablename__ = "logins"
    login_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    last_login = Column(DateTime)

class ShopExpense(Base):
    __tablename__ = "shop_expenses"
    expense_id = Column(Integer, primary_key=True, index=True)
    expense_type = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    expense_date = Column(DateTime, default=datetime.utcnow)
    description = Column(Text)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))

class ShopBalance(Base):
    __tablename__ = "shop_balance"
    balance_id = Column(Integer, primary_key=True, index=True)
    gold_balance_grams = Column(Float, nullable=False)
    cash_balance_usd = Column(Float, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class GoldType(Base):
    __tablename__ = "gold_types"
    gold_type_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)

class GoldRate(Base):
    __tablename__ = "gold_rates"
    rate_id = Column(Integer, primary_key=True, index=True)
    gold_type_id = Column(Integer, ForeignKey("gold_types.gold_type_id"))
    rate_per_gram = Column(Float, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    txn_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
    gold_type_id = Column(Integer, ForeignKey("gold_types.gold_type_id"))
    grams = Column(Float, nullable=False)
    rate_per_gram = Column(Float, nullable=False)
    total_usd = Column(Float, nullable=False)
    txn_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text)