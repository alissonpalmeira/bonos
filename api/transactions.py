import os
CONTRACT_ADDRESS = os.environ['CONTRACT_ADDRESS']

INITIALIZE_ACCOUNT =  f"""
import Bonos from {CONTRACT_ADDRESS}

transaction() {{
    prepare(account: AuthAccount) {{
        account.save(<- Bonos.createCase(account: account), to: Bonos.CaseStoragePath)
        account.link<&Bonos.Case{{Bonos.Receiver, Bonos.Balance}}>(Bonos.CasePublicPath, target: Bonos.CaseStoragePath)
        account.link<&Bonos.Case>(Bonos.CasePrivatePath, target: Bonos.CaseStoragePath)

        Bonos.issue(account: account)
    }}
}}"""

UPSERT_WISH=f"""
import Bonos from {CONTRACT_ADDRESS}

transaction(amount: UFix64, issuer: Address) {{
    let account: AuthAccount
    let wishlist: &{{Bonos.WishlistPublic}}

    prepare(account: AuthAccount) {{
        self.account = account
        self.wishlist = Bonos.borrowWishlist()
        log(amount)
        log(issuer)

    }}

    execute {{
        self.wishlist.upsertWish(account: self.account, amount: amount, issuer: issuer)
    }}    
}}"""