from fastapi import FastAPI
from app.routes import auth, transaction, logs
from database.database import database, metadata, engine
import sqlalchemy

engine = sqlalchemy.create_engine("sqlite:///./database/users.db")
metadata.create_all(engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(transaction.router)
app.include_router(logs.router, prefix="/logs", tags=["logs"])

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
