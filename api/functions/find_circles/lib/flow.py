import os
from flow_py_sdk import (
    flow_client,
    Script    
)
from lib.scripts import _GET_WISHES, GET_AVAILABLE_BALANCE

HOST = os.environ['HOST']
PORT = os.environ['PORT']

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
                    'amount': wish['issuer'], 
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

async def _get_balance():
    balance_result = await _execute_script(GET_AVAILABLE_BALANCE) 
    balance = {}
    for item in balance_result.value:
        balance[item.key.encode()['value']] = float(item.value.encode()['value'])
    return balance


async def _get_wishes():
    wishes_result = await _execute_script(_GET_WISHES)
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
