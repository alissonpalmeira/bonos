import os
from flow_py_sdk import (
    flow_client,
    InMemorySigner,
    ProposalKey,
    Script,
    Tx  
)
from flow_py_sdk.cadence import Address
from lib.scripts import GET_WISHES, GET_AVAILABLE_BALANCE
from lib.transactions import EXCHANGE
from string import Template

HOST = os.environ['HOST']
PORT = os.environ['PORT']
CONTRACT_ADDRESS = os.environ['CONTRACT_ADDRESS']
PRIVATE_KEY = os.environ['PRIVATE_KEY']


async def exchange(circle):
    receivers, providers = [], []
    for edge in circle['edges']:
        receivers.append(edge[0])
        providers.append(edge[1])
    params = {
        'amount': circle['amount'],
        'receivers': ', '.join(receivers),
        'providers': ', '.join(providers)
    }
    cadence_transaction = Template(EXCHANGE).safe_substitute(params)
    await execute_transaction(cadence_transaction)

async def read_edges():
    balance = await _get_balance()
    wishes = await _get_wishes()
    edges = []
    
    for wish in wishes: 
        edges.append(            
            (
                wish['demander'], 
                wish['issuer'],
                {
                    'amount': wish['amount'], 
                    'issuable': balance[wish['demander']]
                }
            )
        )
    return edges

async def _execute_script(cadence_script, arguments=None):
    script = Script(
        code=cadence_script,
        arguments=arguments)

    async with flow_client(
            host=HOST, port=PORT
    ) as client:
        return await client.execute_script(script)
    
async def execute_transaction(transaction_script, arguments=[]):
    async with flow_client(
            host=HOST, port=PORT
    ) as client:
        address = Address.from_hex(CONTRACT_ADDRESS[2:])
        account = await client.get_account(address=address.bytes)
        latest_block = await client.get_latest_block()
        signer = InMemorySigner(
                hash_algo=account.keys[0].hash_algo,
                sign_algo=account.keys[0].sign_algo,
                private_key_hex=PRIVATE_KEY)
        transaction = Tx(
            code=transaction_script,
            reference_block_id=latest_block.id,
            payer=address,
            proposal_key=ProposalKey(
                key_address=address,
                key_id=0,
                key_sequence_number=account.keys[0].sequence_number,
            ),
        )
        transaction.add_arguments(*arguments)
        transaction.with_gas_limit(500)
        transaction.add_authorizers(*[address])
        transaction.with_envelope_signature( address, 0, signer)
        response = await client.send_transaction(transaction=transaction.to_signed_grpc())


async def _get_balance():
    balance_result = await _execute_script(GET_AVAILABLE_BALANCE) 
    balance = {}
    for item in balance_result.value:
        balance[item.key.encode()['value']] = float(item.value.encode()['value'])
    return balance


async def _get_wishes():
    wishes_result = await _execute_script(GET_WISHES)
    wishes = []
    for _wishes in wishes_result.value:
        demander = _wishes.key.encode()['value']
        for item in _wishes.value.value:
            wishes.append(
                {
                    'demander': demander,
                    'issuer': item.key.encode()['value'],
                    'amount': float(item.value.encode()['value'])
                }
            )
    return wishes
