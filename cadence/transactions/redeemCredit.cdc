import Bonos from "../contracts/Bonos.cdc"

transaction(amount: UFix64, issuer: Address) {
    let accountCase: &{Bonos.Provider}
    let contractCase: &{Bonos.Receiver}

    prepare(account: AuthAccount) {
        let capability = account.getCapability<&Bonos.Case>(Bonos.CasePrivatePath)
        self.accountCase = capability.borrow() ?? panic("Case capability could not be borrowed")
        self.contractCase = Bonos.borrowCase()
    }

    execute {
        let tempCase <- self.accountCase.withdraw(amount: amount, issuer: issuer)
        self.contractCase.deposit(from: <- tempCase)
    }    
}
 