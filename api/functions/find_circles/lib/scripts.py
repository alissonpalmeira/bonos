import os

CONTRACT_ADDRESS = os.environ['CONTRACT_ADDRESS']

GET_AVAILABLE_BALANCE = f"""
import Bonos from {CONTRACT_ADDRESS}

pub fun main(): {{Address:UFix64}} {{
    let case = Bonos.borrowCase()
    return case.balance
}}"""

GET_WISHES= f"""
import Bonos from {CONTRACT_ADDRESS}

pub fun main(): {{Address: {{Address: UFix64}}}} {{
    let wishlist = Bonos.borrowWishlist()
    return wishlist.wishes
}}"""