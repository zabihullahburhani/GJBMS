from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime
from databases import Database
import sqlite3

DATABASE_URL = "sqlite:///./database/users.db"

engine = create_engine(DATABASE_URL)
database = Database(DATABASE_URL)
metadata = MetaData()

def get_db_connection():
    conn = sqlite3.connect("database/users.db")
    conn.row_factory = sqlite3.Row
    return conn

activity_logs = Table(
    "activity_logs",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String, nullable=False),
    Column("action", String, nullable=False),
    Column("timestamp", DateTime, nullable=False),
    Column("details", String, nullable=True),
)
