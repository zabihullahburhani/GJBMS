import sqlite3
from datetime import datetime
from passlib.context import CryptContext

# تنظیمات برای هش کردن رمز عبور
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_data():
    # اتصال به دیتابیس
    conn = sqlite3.connect('database/database_pasa.db')
    cursor = conn.cursor()

    # هش کردن رمز عبور "123"
    hashed_password = pwd_context.hash("123")

    # افزودن کاربر ادمین به جدول employees (اگر وجود ندارد)
    cursor.execute('''
        INSERT OR IGNORE INTO employees (full_name, role, phone, created_at)
        VALUES (?, ?, ?, ?)
    ''', ('Admin User', 'admin', 'admin', datetime.now()))

    # افزودن کاربر ادمین به جدول logins
    cursor.execute('''
        INSERT OR IGNORE INTO logins (employee_id, username, password_hash, last_login)
        VALUES ((SELECT employee_id FROM employees WHERE full_name = 'Admin User'), ?, ?, NULL)
    ''', ('admin', hashed_password))

    # ذخیره تغییرات
    conn.commit()
    conn.close()
    print("داده‌های اولیه با موفقیت اضافه شدند.")

if __name__ == "__main__":
    seed_data()