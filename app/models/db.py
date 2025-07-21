import sqlite3

DB_NAME = "database/users.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # برای دسترسی dict مانند
    return conn

# (اختیاری) تابع برای ایجاد جداول
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )
    """)
    #
    # اضافه کردن admin پیش‌فرض
    cur.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)",
                ("admin", "$2b$12$examplehashedpassword", "admin"))
    conn.commit()
    conn.close()
