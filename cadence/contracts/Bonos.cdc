 
pub contract Bonos {
    pub let PouchStoragePath: StoragePath
    pub let PouchPrivatePath: PrivatePath
    pub let PouchPublicPath: PublicPath

    pub let initialBalance: UFix64

    pub resource interface Provider {
        pub fun withdraw(amount: UFix64, issuer: Address): @Pouch
    }

    pub resource interface Receiver {
        pub fun deposit(from: @Pouch)
    }

    pub resource interface Balance {     
        // The total balance per issuer of the Pouch
        // key: issuer's Address
        // value: amount
        pub let balance: {Address: UFix64}

        init(balance: UFix64, issuer: Address) {
            post {
                self.balance[issuer] == balance: "balance@issuer must be initialized to the initial balance"
            }
        }
    }

    pub resource Pouch: Provider, Receiver, Balance {
        pub let balance: {Address: UFix64}

        init(balance: UFix64, issuer: Address){
            self.balance = {}
            self.balance[issuer] = balance
        }

        pub fun withdraw(amount: UFix64, issuer: Address): @Pouch {
            pre {
                self.balance[issuer]! >= amount: "amount@issuer withdrawn must be less than or equal than the balance@issuer of the Pouch"
            }
            post {
                self.balance[issuer] == before(self.balance[issuer]!) - amount: "New Pouch balance@issuer must be the difference of the previous balance@issuer and the withdrawn Pouch"
            }
            self.balance[issuer] = self.balance[issuer]! - amount
            return <-create Pouch(balance: amount, issuer: issuer)
        }

        pub fun deposit(from: @Pouch) {
            // Assert that the concrete type of the deposited vault is the same
            // as the vault that is accepting the deposit
            // pre {
            //     from.isInstance(self.getType()): "Cannot deposit an incompatible token type"
            // }
            // post {
            //    for issuer in from.balance.keys {
            //        self.balance[issuer] == before(self.balance[issuer]) + before(from.balance[issuer]): "New Vault balance must be the sum of the previous balance and the deposited Vault"
            //    }
            //}
            for issuer in from.balance.keys {
                self.balance[issuer] = self.balance[issuer]! + from.balance[issuer]!
            }
            destroy from
        }
    }

    pub fun createPouch(account: AuthAccount): @Pouch {
        return <- create Pouch(balance: self.initialBalance, issuer: account.address)
    }

    init() {
        self.PouchStoragePath = StoragePath(identifier: "bonosPouch") ?? panic("Could not set storage path")
        self.PouchPrivatePath = PrivatePath(identifier: "bonosPouch") ?? panic("Could not set private path")
        self.PouchPublicPath = PublicPath(identifier: "bonosPouch") ?? panic("Could not set public path")

        self.initialBalance = 100.0
    }
}
