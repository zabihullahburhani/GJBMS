from passlib.context import CryptContext
# This file is part of GJBMS (GJ Business Management System).
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# This module provides functions for hashing and verifying passwords using bcrypt.
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


 # This function hashes a plain password using bcrypt and returns the hashed password.
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

