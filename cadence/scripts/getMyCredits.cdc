import Bonos from "../contracts/Bonos.cdc"

pub fun main(account: Address): {Address: UFix64} {
    let account = getAccount(account)
    let capability = account.getCapability<&Bonos.Case{Bonos.Balance}>(Bonos.CasePublicPath)
    let case = capability.borrow() ?? panic("Case capability could not be borrowed")
    return case.balance
}
