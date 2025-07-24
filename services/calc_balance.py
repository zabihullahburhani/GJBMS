# file: services/calc_balance.py
import sqlite3

DB_PATH = 'db/shop.db'

def calculate_totals():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # مجموع طلا (grams)
    cursor.execute("SELECT SUM(grams) FROM transactions")
    total_grams = cursor.fetchone()[0] or 0

    # مجموع دالر
    cursor.execute("SELECT SUM(grams * rate_per_gram) FROM transactions")
    total_usd = cursor.fetchone()[0] or 0

    conn.close()
    return {"total_grams": total_grams, "total_usd": total_usd}

# مثال استفاده:
# print(calculate_totals())
