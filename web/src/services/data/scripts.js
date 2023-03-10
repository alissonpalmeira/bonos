
export const CHECK_IS_INITIALIZED = `
import Bonos from 0xBonos

pub fun main(account: Address): Bool {
    let capability = getAccount(account).getCapability<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath)
    let isIssued = Bonos.isIssued(issuer: account)

    return capability.check() && isIssued
}
`;

export const GET_AVAILABLE_BALANCE = `
import Bonos from 0xBonos

pub fun main(account: Address): UFix64 {
    let case = Bonos.borrowCase()
    return case.getBalanceByIssuer(issuer: account)
}
`;

export const GET_CREDITS = `
import Bonos from 0xBonos

pub fun main(account: Address): {Address: UFix64} {
    let account = getAccount(account)
    let capability = account.getCapability<&Bonos.Case{Bonos.Balance}>(Bonos.CasePublicPath)
    let case = capability.borrow() ?? panic("Case capability could not be borrowed")
    return case.balance
}
`;

export const GET_WISHLIST = `
import Bonos from 0xBonos

pub fun main(account: Address): {Address: UFix64} {
    let wishlist = Bonos.borrowWishlist()
    return wishlist.getWishesByAccount(account: account)
}
`;
