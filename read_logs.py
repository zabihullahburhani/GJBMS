import sqlite3

db_path = "database/users.db"

conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row

query = "SELECT * FROM activity_logs"
cursor = conn.cursor()
cursor.execute(query)
logs = cursor.fetchall()

with open("logs.txt", "w", encoding="utf-8") as f:
    for log in logs:
        line = f"ID: {log['id']}, User: {log['user_id']}, Action: {log['action']}, Time: {log['timestamp']}, Details: {log['details']}\n"
        f.write(line)

print("✅ لاگ‌ها در فایل logs.txt ذخیره شد.")

conn.close()
