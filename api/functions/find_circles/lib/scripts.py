import os

ACCOUNT_ADDRESS = os.environ['ACCOUNT_ADDRESS']

GET_AVAILABLE_BALANCE = f"""
import Bonos from {ACCOUNT_ADDRESS}

pub fun main(): {{Address:UFix64}} {{
    let case = Bonos.borrowCase()
    return case.balance
}}"""

GET_WISHES= f"""
import Bonos from {ACCOUNT_ADDRESS}

pub fun main(): {{Address: {{Address: UFix64}}}} {{
    let wishlist = Bonos.borrowWishlist()
    return wishlist.wishes
}}"""