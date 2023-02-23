import Bonos from "../contracts/Bonos.cdc"

pub fun main(): {Address:UFix64} {
    let case = Bonos.borrowCase()
    return case.balance
}
