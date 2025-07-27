from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
from sqlalchemy import ForeignKey



DATABASE_URL = "sqlite:///database/database_pasa.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class Login(Base):
    __tablename__ = "logins"
    login_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    last_login = Column(DateTime)

    
class Customer(Base):
    __tablename__ = "customers"
    customer_id = Column(Integer, primary_key=True, index=True)
    
    full_name = Column(String)
    phone = Column(String)
    address = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


