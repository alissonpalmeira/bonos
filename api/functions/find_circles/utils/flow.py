from flow_py_sdk import (
    flow_client,
    Script    
)
import os
from lib.scripts import GET_WISHES, GET_AVAILABLE_BALANCE


HOST = os.environ['HOST']
PORT = os.environ['PORT']

async def execute_script(cadence_script, arguments=None):
    script = Script(
        code=cadence_script,
        arguments=arguments)

    async with flow_client(
            host=HOST, port=PORT
    ) as client:
        return await client.execute_script(script)
    

async def read_edges():
    balance = await get_balance()
    wishes = await get_wishes()
    edges = []
    for wish in wishes: 
        edges.append(            
            (
                wish['demander'], 
                wish['issuer'],
                {
                    'amount': wish['issuer'], 
                    'issuable': balance[wish['demander']]
                }
            )
        )
    return edges

async def get_balance():
    balance_result = await execute_script(GET_AVAILABLE_BALANCE) 
    balance = {}
    for item in balance_result.value:
        balance[item.key.encode()['value']] = float(item.value.encode()['value'])
    return balance


async def get_wishes():
    wishes_result = await execute_script(GET_WISHES)
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
