import os
CONTRACT_ADDRESS = os.environ['CONTRACT_ADDRESS']

CHECK_IS_INITIALIZED =  f"""
import Bonos from {CONTRACT_ADDRESS}

pub fun main(account: Address): Bool {{

    let capability = getAccount(account).getCapability<&Bonos.Case{{Bonos.Receiver, Bonos.Balance}}>(Bonos.CasePublicPath)

    let isIssued = Bonos.isIssued(issuer: account)

    return capability.check() && isIssued}}"""

GET_AVAILABLE_BALANCE_BY_ISSUER = f"""
import Bonos from {CONTRACT_ADDRESS}

pub fun main(account: Address): UFix64 {{
    let case = Bonos.borrowCase()
    return case.getBalanceByIssuer(issuer: account)
}}"""

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

GET_MY_WHISHES = f"""
import Bonos from {CONTRACT_ADDRESS}

pub fun main(account: Address): {{Address: UFix64}} {{
    let wishlist = Bonos.borrowWishlist()
    return wishlist.getWishesByAccount(account: account)
}}"""