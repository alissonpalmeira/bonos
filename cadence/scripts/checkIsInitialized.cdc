import Bonos from "../contracts/Bonos.cdc"

pub fun main(account: Address): Bool {
    let capability = getAccount(account).getCapability<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath)
    let isIssued = Bonos.isIssued(issuer: account)

    return capability.check() && isIssued
}
