# file: blockchain/blockchain.py
import hashlib, json, time

class Block:
    def __init__(self, index, data, previous_hash):
        self.index = index
        self.timestamp = time.time()
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.calculate_hash()
    
    def calculate_hash(self):
        block_string = f"{self.index}{self.timestamp}{json.dumps(self.data)}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]
    
    def create_genesis_block(self):
        return Block(0, {"message": "Genesis Block"}, "0")
    
    def add_block(self, data):
        last_block = self.chain[-1]
        new_block = Block(last_block.index+1, data, last_block.hash)
        self.chain.append(new_block)
        self.save_chain()
    
    def save_chain(self):
        with open('blockchain/chain.json', 'w') as f:
            json.dump([block.__dict__ for block in self.chain], f, indent=4)
