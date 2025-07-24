# file: license/license.py
import hashlib

SECRET_KEY = "MySuperSecret"

def generate_machine_code():
    mac = "FAKE-MAC-ADDR"  # واقعی از uuid یا getmac بگیرید
    raw = mac
    return hashlib.sha256(raw.encode()).hexdigest()

def generate_license_key(machine_code):
    return hashlib.sha256((machine_code + SECRET_KEY).encode()).hexdigest()

def check_license(machine_code, input_license):
    return generate_license_key(machine_code) == input_license
