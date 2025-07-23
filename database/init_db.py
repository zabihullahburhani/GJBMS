import sqlite3

def init_db():
    conn = sqlite3.connect("database/users.db")
    cur = conn.cursor()

    # جدول کاربران (قبلاً داشتیم)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
    """)

    # ✅ جدول معاملات
    cur.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            date TEXT,
            detail TEXT,
            gold_total REAL,
            gold_remain REAL,
            dollar_total REAL,
            dollar_remain REAL,
            balance_dollar REAL
        )
    """)

    conn.commit()
    conn.close()
    print("✅ DB initialized with users & transactions tables.")

if __name__ == "__main__":
    init_db()
