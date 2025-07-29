# GJBMS – Gold Jewelry Business Management System

سیستم مدیریت جامع فروش و موجودی طلا  
طراحی و توسعه توسط **ذبیح الله برهانی**

---

## 📦 تکنولوژی‌ها
- Backend: FastAPI + SQLAlchemy + Alembic
- Frontend: React (یا Next.js)
- Database: PostgreSQL (یا SQLite)
- مدیریت گرافیکی دیتابیس: pgAdmin یا Adminer
- امنیت: JWT, bcrypt, OAuth2

---

## ⚙️ راه‌اندازی بک‌اند

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ویندوز: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
