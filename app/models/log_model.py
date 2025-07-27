from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .db import Base

class Login(Base):
    __tablename__ = "logins"

    login_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"))
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    last_login = Column(DateTime)

    employee = relationship("Employee", back_populates="login")
