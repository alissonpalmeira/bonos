import json
import os
import sys

process_transactions = os.path.normpath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.append(process_transactions)

os.environ['HOST'] = '127.0.0.1'
os.environ['PORT'] = '3569'
os.environ['CONTRACT_ADDRESS'] = '0xf8d6e0586b0a20c7'
os.environ['PRIVATE_KEY'] = '579e9e82248a266c9c3081ee8acd6d877713fc6dd5199abf6a21d2b412b1f531'

from app import lambda_handler

lambda_handler({},{})
 