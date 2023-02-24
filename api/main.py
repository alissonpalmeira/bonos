from flow_py_sdk import (
    flow_client,
    ProposalKey,
    Script,
    Tx
)
from flow_py_sdk.cadence import Address, Fix64
from flow_py_sdk.signer import InMemorySigner, HashAlgo, SignAlgo

import asyncio
import os
from config import Config

ctx=Config('/home/diego/Documents/AVENIR/bonos/flow.json')

os.environ['CONTRACT_ADDRESS'] = str(ctx.service_account_address)

from scripts import GET_MY_WHISHES, GET_WISHES, CHECK_IS_INITIALIZED, GET_AVAILABLE_BALANCE_BY_ISSUER, GET_AVAILABLE_BALANCE
from transactions import INITIALIZE_ACCOUNT, UPSERT_WISH


async def execute_script(ctx, cadence_script, arguments=None):
    script = Script(
        code=cadence_script,
        arguments=arguments)

    async with flow_client(
            host=ctx.host, port=ctx.port
    ) as client:
        return await client.execute_script(script)

async def execute_transaction(ctx, address, key, transaction_script, arguments=[]):
    async with flow_client(
            host=ctx.host, port=ctx.port
    ) as client:

        account = await client.get_account(address=address.bytes)
        latest_block = await client.get_latest_block()
        signer = InMemorySigner(
                hash_algo=HashAlgo.from_string("SHA3_256"),
                sign_algo=SignAlgo.from_string("ECDSA_P256"),
                private_key_hex=key)
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
        transaction.add_authorizers(*[address])
        transaction.with_envelope_signature( address, 0, signer)
        response = await client.send_transaction(transaction=transaction.to_signed_grpc())

        # print('transaction: ', response)



async def initialize_accounts(accounts):
    for alias, user in accounts.items():
        address = Address.from_hex(user['address'])

        result = await execute_script(
                        ctx,
                        CHECK_IS_INITIALIZED,
                        [address], 
                    )  
            
        if not result.value:
            print(f'Incializando o usuário {alias}')
            await execute_transaction(
                    ctx,
                    address, 
                    user['key'],
                    INITIALIZE_ACCOUNT
                    )
        else:
            print(f'Usuário {alias} já está inicializado')



async def create_wishes(accounts, whishes):
    for wish in whishes:
        account = accounts[wish['demander']]
        address = Address.from_hex(account['address'])
        arguments = [
                    Fix64(wish['amount']),
                    Address.from_hex(accounts[wish['issuer']]['address'])
                ]
        await execute_transaction(
                ctx,
                address, 
                account['key'],
                UPSERT_WISH,
                arguments
                )
        print(account['address'], account['key'])


accounts = {
    "a": {
			"address": "01cf0e2f2f715450",
			"key": "d47cdbea7dfb735a3a31ffe2bf87b5b17c908171fc80a6c4d6612399547ec63e"
		},
		"b": {
			"address": "179b6b1cb6755e31",
			"key": "91539e4643e07c3c559811694fd0bf6119cd0600fd57a4f3f4513408c76dee99"
		},
		"c": {
			"address": "f3fcd2c1a78f5eee",
			"key": "ff936c153449b92e674ebb0561b652ee042b577afcb6dd303021fd87af6db375"
		},
		"d": {
			"address": "e03daebed8ca0615",
			"key": "34724cf79e53f539642513e3b330d4315eee229eead15c6bbdd6bf808e6316a9"
		},
		"e": {
			"address": "045a1763c93006ca",
			"key": "ea08280ad5c3a2c88276364110d53b39b953bb4180dcefb7131bb48bc1f5aca6"
		},
		"emulator-account": {
			"address": "f8d6e0586b0a20c7",
			"key": "579e9e82248a266c9c3081ee8acd6d877713fc6dd5199abf6a21d2b412b1f531",
			"sigAlgorithm": "ECDSA_P256",
			"hashAlgorithm": "SHA3_256"
		},
		"f": {
			"address": "120e725050340cab",
			"key": "35f8634a716d23f8f4e211661cabc00904435491473a31b01622d095828f2e77"
		},
		"g": {
			"address": "f669cb8d41ce0c74",
			"key": "9f4e79dd8af47ee50e13c82e52821e2e75dd02c9dc7f62c29156c5bd064a803c"
		},
		"h": {
			"address": "192440c99cb17282",
			"key": "7a89327836c99fe4606451aa82d1726d8f13e3ab8309471e01ba3f21589dae91"
		},
		"i": {
			"address": "fd43f9148d4b725d",
			"key": "0fc86ceefcdb150d94dab3a41eacadd0b2f1698e14c13f48520d5415c39574c9"
		},
		"j": {
			"address": "eb179c27144f783c",
			"key": "9157dc2c7af9ead256abeeab74e5d60fd0b85732cf8a7c5e5de73ad1bf1aedd9"
		},
        "k": {
			"address": "ff8975b2fe6fb6f1",
			"key": "e57d5ff3ba9be30fc0e02c41746765d5e432776733d200fb5ef460dda6b7f0ad"
		},
}

wishes =  [{
        'demander': 'b',
        'amount': 50.0,
        'issuer': 'a'
    }, {
        'demander': 'c',
        'amount': 50.0,
        'issuer': 'a'
    }, {
        'demander': 'd',
        'amount': 10.0,
        'issuer': 'b'
    }, {
        'demander': 'd',
        'amount': 10.0,
        'issuer': 'c'
    }, {
        'demander': 'd',
        'amount': 90.0,
        'issuer': 'e'
    }, {
        'demander': 'e',
        'amount': 10.0,
        'issuer': 'b'
    }, {
        'demander': 'e',
        'amount': 10.0,
        'issuer': 'c'
    }, {
        'demander': 'e',
        'amount': 10.0,
        'issuer': 'f'
    }, {
        'demander': 'e',
        'amount': 10.0,
        'issuer': 'g'
    }, {
        'demander': 'e',
        'amount': 50.0,
        'issuer': 'h'
    }, {
        'demander': 'f',
        'amount': 20.0,
        'issuer': 'b'
    }, {
        'demander': 'g',
        'amount': 20.0,
        'issuer': 'c'
    }, {
        'demander': 'h',
        'amount': 10.0,
        'issuer': 'a'
    }, {
        'demander': 'h',
        'amount': 10.0,
        'issuer': 'b'
    }, {
        'demander': 'h',
        'amount': 10.0,
        'issuer': 'c'
    }, {
        'demander': 'h',
        'amount': 10.0,
        'issuer': 'f'
    }, {
        'demander': 'h',
        'amount': 10.0,
        'issuer': 'g'
    }]

loop = asyncio.get_event_loop()
# loop.run_until_complete(initialize_accounts(accounts))
loop.run_until_complete(create_wishes(accounts, wishes))


# result = loop.run_until_complete(asyncio.gather(execute_script(
#                         ctx,
#                         GET_AVAILABLE_BALANCE,
#                         None, 
#                     )  ))

# result = loop.run_until_complete(asyncio.gather(execute_script(
#                         ctx,
#                         GET_MY_WHISHES,
#                         [Address.from_hex('01cf0e2f2f715450')], 
#                     )  ))

# print("WHISHES: ", result[0].value)