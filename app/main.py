from fastapi import FastAPI
from app.routes import auth, transaction, logs
from database.database import database, metadata, engine
import sqlalchemy
from app.routes import dashboard

from services.calc_balance import calculate_totals
from blockchain.blockchain import Blockchain







engine = sqlalchemy.create_engine("sqlite:///./database/users.db")
metadata.create_all(engine)

app = FastAPI()
bc = Blockchain()


app.include_router(auth.router)
app.include_router(transaction.router)
app.include_router(logs.router, prefix="/logs", tags=["logs"])
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])



@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


# block chain endpoints

@app.post("/add-transaction/")
def add_transaction(txn: dict):
    bc.add_block(txn)
    return {"status": "transaction added to blockchain"}

@app.get("/totals/")
def get_totals():
    return calculate_totals()

@app.get("/chain/")
def get_chain():
    return [block.__dict__ for block in bc.chain]