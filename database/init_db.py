import sqlite3
from app.models.db import get_db_connection
from app.models.db import init_db
from app.utils.security import hash_password

def run():
    # هش پسورد admin
    hashed_admin_password = hash_password("admin123")
    init_db()  # ساخت جدول
    # به‌روزرسانی پسورد admin
    conn = init_db()
    conn = sqlite3.connect("database/users.db")
    cur = conn.cursor()
    cur.execute("UPDATE users SET password=? WHERE username=?", (hashed_admin_password, "admin"))
    conn.commit()
    conn.close()
    print("DB initialized with default admin user.")

if __name__ == "__main__":
    run()



