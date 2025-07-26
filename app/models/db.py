from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# مسیر دقیق دیتابیس شما
DATABASE_URL = "sqlite:///../../database/database_pasa.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# ایجاد SessionLocal برای ارتباط با دیتابیس
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# این متد رو اضافه کن برای import
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
