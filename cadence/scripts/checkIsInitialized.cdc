import Bonos from "../contracts/Bonos.cdc"

pub fun main(account: Address): Bool {
    let capability = getAccount(account).getCapability<&Bonos.Pouch{Bonos.Receiver, Bonos.Balance}>(Bonos.PouchPublicPath)
    return capability.check()
}
