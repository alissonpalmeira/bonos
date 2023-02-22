import Bonos from 0x01

pub fun main(account: Address): Bool {
    let capability = getAccount(account).getCapability<&Bonos.Pouch{Bonos.Receiver, Bonos.Balance}>(Bonos.PouchPublicPath)
    return capability.check()
}
