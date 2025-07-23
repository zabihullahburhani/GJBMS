import sqlalchemy
from app.database import metadata

activity_logs = sqlalchemy.Table(
    "activity_logs",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("action", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("timestamp", sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column("details", sqlalchemy.String, nullable=True),
)
