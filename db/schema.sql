-- file: db/schema.sql
CREATE TABLE IF NOT EXISTS transactions (
    txn_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    employee_id INTEGER,
    gold_type_id INTEGER,
    grams DECIMAL,
    rate_per_gram DECIMAL,
    txn_date TEXT
);
