# app/services/audit_service.py
from blockchain.blockchain import Blockchain

blockchain = Blockchain()

def log_action(sender, action, data):
    blockchain.new_transaction(sender=sender, recipient="GJBMS", data={"action": action, "data": data})
    last_proof = blockchain.last_block['proof']
    proof = blockchain.proof_of_work(last_proof)
    blockchain.new_block(proof)