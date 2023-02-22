 
pub contract Bonos {
    
    pub struct VoucherInfo {
        pub let issuer: Address
        pub let amount: UFix64

        init(issuer: Address, amount: UFix64) {
            self.issuer = issuer
            self.amount = amount
        }
    }

    pub resource interface Provider {
        pub fun withdraw(amount: UFix64, issuer: Address): @Pouch
    }

    pub resource interface Receiver {
        pub fun deposit(from: @Pouch)
    }

    pub resource interface Balance {
        // The total balance of balance of the Pouch
        // pub var balance: UFix64
        
        // The total balance of balance per issuer of the Pouch
        // key: issuer's Address
        // value: amount
        pub var balance: {Address, UFix64}

        init(balance: UFix64, issuer: Address) {
            post {
                self.balance == balance: "Balance must be initialized to the initial balance"
                self.issuer == issuer: "Issuer must be initialized to the issuer"
            }
        }
    }

    pub resource Pouch: Provider, Receiver, Balance {
        // pub var balance: UFix64

        pub var balance: {Address, UFix64}

        init(balance: UFix64, issuer: Address)

        pub fun withdraw(amount: UFix64, issuer: Address): @Pouch {
            pre {
                self.balance[issuer] >= amount: "amount@issuer withdrawn must be less than or equal than the balance@issuer of the Pouch"
            }
            post {
                self.balance[issuer] == before(self.balance[issuer]) - amount: "New Pouch balance@issuer must be the difference of the previous balance@issuer and the withdrawn Pouch"
            }
            self.balance[issuer] = self.balance[issuer] - amount
            return <-create Pouch(balance: amount, issuer: issuer)
        }

        pub fun deposit(from: @Pouch) {
            // Assert that the concrete type of the deposited vault is the same
            // as the vault that is accepting the deposit
            // pre {
            //     from.isInstance(self.getType()): "Cannot deposit an incompatible token type"
            // }
            post {
                for issuer in balance.keys {
                    self.balance[issuer] == before(self.balance[issuer]) + before(from.balance[issuer]): "New Vault balance must be the sum of the previous balance and the deposited Vault"
                }
            }
            for issuer in balance.keys {
                self.balance[issuer] == self.balance[issuer] + from.balance[issuer]
            }
            destroy from
        }
    }
}