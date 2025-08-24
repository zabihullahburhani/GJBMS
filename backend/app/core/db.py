from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

connect_args = {"check_same_thread": False} if settings.SQLALCHEMY_DATABASE_URI.startswith("sqlite") else {}
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, future=True, echo=False, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
Base = declarative_base()
