import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from license.license import generate_machine_code, generate_license_key, check_license

def test_license_system():
    mc = generate_machine_code()
    lk = generate_license_key(mc)
    is_valid = check_license(mc, lk)
    print(f"Machine Code: {mc}")
    print(f"License Key: {lk}")
    print(f"Is Valid: {is_valid}")

if __name__ == "__main__":
    test_license_system()
