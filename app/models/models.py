from sqlalchemy import Column, Integer, Text, REAL, ForeignKey
from .db import Base

class Employee(Base):
    __tablename__ = "employees"
    employee_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(Text, nullable=False)
    phone = Column(Text, nullable=False)
    hire_date = Column(Text, nullable=False)
    nic = Column(Text, nullable=False)
    termination_date = Column(Text)
    guarantor = Column(Text, nullable=False)
    salary = Column(REAL)
    status = Column(Text)

class EmployeeSalary(Base):
    __tablename__ = "employee_salaries"
    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)
    payment_date = Column(Text, nullable=False)
    amount = Column(REAL)
    notes = Column(Text)

class Login(Base):
    __tablename__ = "logins"
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(Text)
    username = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(Text, nullable=False)

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(Text)
    category = Column(Text)
    amount = Column(REAL)
    recipient = Column(Text)
    created_by = Column(Text)

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    phone = Column(Text, nullable=False)
    address = Column(Text)
