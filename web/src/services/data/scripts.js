
export const IS_INITIALIZED = `
import Bonos from 0xBonos

pub fun main(account: Address): Bool {
    let capability = getAccount(account).getCapability<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath)
    let isIssued = Bonos.isIssued(issuer: account)

    return capability.check() && isIssued
}
`; 