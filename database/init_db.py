import sqlite3
from pathlib import Path
import sys
sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.utils.security import hash_password

def init():
    db_file = Path("database/users.db")
    if db_file.exists():
        db_file.unlink()  # delete old db
    conn = sqlite3.connect(db_file)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    """)
    # default admin
    hashed = hash_password("admin123")
    cur.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ("admin", hashed, "admin"))
    conn.commit()
    conn.close()
    print("DB initialized with default admin user.")

if __name__ == "__main__":
    init()
