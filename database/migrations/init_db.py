# database/migrations/init_db.py
import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('database/database_pasa.db')
    cursor = conn.cursor()

    # جدول مشتریان
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS customers (
            customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name VARCHAR NOT NULL,
            phone VARCHAR,
            address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # جدول کارمندان
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name VARCHAR NOT NULL,
            role VARCHAR NOT NULL,
            phone VARCHAR,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # جدول لاگین
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS logins (
            login_id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER,
            username VARCHAR NOT NULL UNIQUE,
            password_hash VARCHAR NOT NULL,
            last_login DATETIME,
            FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        )
    ''')

    # جدول مصارف دوکان
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS shop_expenses (
            expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
            expense_type VARCHAR NOT NULL,
            amount DECIMAL NOT NULL,
            expense_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            description TEXT,
            employee_id INTEGER,
            FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        )
    ''')

    # جدول بیلانس دوکان
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS shop_balance (
            balance_id INTEGER PRIMARY KEY AUTOINCREMENT,
            gold_balance_grams DECIMAL NOT NULL,
            cash_balance_usd DECIMAL NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # جدول نوع طلا
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gold_types (
            gold_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL,
            description TEXT
        )
    ''')

    # جدول نرخ طلا
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gold_rates (
            rate_id INTEGER PRIMARY KEY AUTOINCREMENT,
            gold_type_id INTEGER,
            rate_per_gram DECIMAL NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (gold_type_id) REFERENCES gold_types(gold_type_id)
        )
    ''')

    # جدول معاملات
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            txn_id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER,
            employee_id INTEGER,
            gold_type_id INTEGER,
            grams DECIMAL NOT NULL,
            rate_per_gram DECIMAL NOT NULL,
            total_usd DECIMAL NOT NULL,
            txn_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            notes TEXT,
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
            FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
            FOREIGN KEY (gold_type_id) REFERENCES gold_types(gold_type_id)
        )
    ''')

    # افزودن کاربر ادمین پیش‌فرض
    cursor.execute('''
        INSERT OR IGNORE INTO employees (full_name, role, phone, created_at)
        VALUES ('Admin User', 'admin', 'admin', ?)
    ''', (datetime.now(),))
    
    cursor.execute('''
        INSERT OR IGNORE INTO logins (employee_id, username, password_hash, last_login)
        VALUES ((SELECT employee_id FROM employees WHERE full_name = 'Admin User'), 'admin', ?, NULL)
    ''', ('$2b$12$YOUR_HASHED_PASSWORD',))  # هش رمز عبور (123)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()