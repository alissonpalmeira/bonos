import os

ACCOUNT_ADDRESS = os.environ['ACCOUNT_ADDRESS']

EXCHANGE = f"""
import Bonos from {ACCOUNT_ADDRESS}
transaction() {{
    prepare(account: AuthAccount) {{
        let admin = account.borrow<&Bonos.Admin>(from: Bonos.AdminStoragePath)
        let amount = ${{amount}} as UFix64
        let receivers = [${{receivers}}] as [Address]
        let providers = [${{providers}}] as [Address]
        admin?.exchange(amount: amount, receivers: receivers, providers: providers)
    }}
}}"""