import json
import os
import sys

process_transactions = os.path.normpath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(process_transactions)

os.environ['HOST'] = '127.0.0.1'
os.environ['PORT'] = '3569'
os.environ['CONTRACT_ADDRESS'] = '0xf8d6e0586b0a20c7'

from app import lambda_handler

print(lambda_handler({},{}))