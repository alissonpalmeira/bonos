import Bonos from "../contracts/Bonos.cdc"

pub fun main(account: Address): UFix64 {
    let case = Bonos.borrowCase()
    return case.getBalanceByIssuer(issuer: account)
}
