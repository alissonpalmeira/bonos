 
pub contract Bonos {
    pub let initialBalance: UFix64
    pub let issuanceLimit: UFix64

    pub let CaseStoragePath: StoragePath
    pub let CasePrivatePath: PrivatePath
    pub let CasePublicPath: PublicPath

    pub let WishlistStoragePath: StoragePath
    pub let WishlistPrivatePath: PrivatePath
    pub let WishlistPublicPath: PublicPath

    pub event ContractInitialized()
    
    init() {
        self.initialBalance = 0.0
        self.issuanceLimit = 100.0

        self.CaseStoragePath = StoragePath(identifier: "bonosCase") ?? panic("Could not set storage path")
        self.CasePrivatePath = PrivatePath(identifier: "bonosCase") ?? panic("Could not set private path")
        self.CasePublicPath = PublicPath(identifier: "bonosCase") ?? panic("Could not set public path")

        self.account.save(<- Bonos.createCase(account: self.account), to: Bonos.CaseStoragePath)
        self.account.link<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath, target: Bonos.CaseStoragePath)
        self.account.link<&Bonos.Case>(Bonos.CasePrivatePath, target: Bonos.CaseStoragePath)

        self.WishlistStoragePath = StoragePath(identifier: "bonosWishlist") ?? panic("Could not set storage path")
        self.WishlistPrivatePath = PrivatePath(identifier: "bonosWishlist") ?? panic("Could not set private path")
        self.WishlistPublicPath = PublicPath(identifier: "bonosWishlist") ?? panic("Could not set public path")

        self.account.save(<- create Wishlist(), to: self.WishlistStoragePath)
        self.account.link<&Wishlist{WishlistPublic}>(self.WishlistPublicPath, target: self.WishlistStoragePath)
        self.account.link<&Wishlist>(self.WishlistPrivatePath, target: self.WishlistStoragePath)
 
        emit ContractInitialized()
    }

    pub resource interface Provider {
        pub fun withdraw(amount: UFix64, issuer: Address): @Case
    }

    pub resource interface Receiver {
        pub fun deposit(from: @Case)
    }

    pub resource interface Balance {     
        // The total balance per issuer of the Case
        // key: issuer's Address
        // value: amount
        pub let balance: {Address: UFix64}

        pub fun getBalanceByIssuer(issuer: Address): UFix64

        init(balance: UFix64, issuer: Address) {
            post {
                self.balance[issuer] == balance: "balance@issuer must be initialized to the initial balance"
            }
        }
    }

    pub resource Case: Provider, Receiver, Balance {
        pub let balance: {Address: UFix64}

        init(balance: UFix64, issuer: Address){
            self.balance = {}
            self.balance[issuer] = balance
        }

        pub fun withdraw(amount: UFix64, issuer: Address): @Case {
            pre {
                self.balance[issuer]! >= amount: "amount@issuer withdrawn must be less than or equal than the balance@issuer of the Case"
            }
            post {
                self.balance[issuer] == before(self.balance[issuer]!) - amount: "New Case balance@issuer must be the difference of the previous balance@issuer and the withdrawn Case"
            }
            self.balance[issuer] = self.balance[issuer]! - amount
            return <-create Case(balance: amount, issuer: issuer)
        }

        pub fun deposit(from: @Case) {
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
                self.balance[issuer] = (self.balance[issuer] ?? 0.0)+ from.balance[issuer]!
            }
            destroy from
        }

        pub fun getBalanceByIssuer(issuer: Address): UFix64 {
            return self.balance[issuer] ?? 0.0
        }
    }

    pub fun createCase(account: AuthAccount): @Case {
        return <- create Case(balance: self.initialBalance, issuer: account.address)
    }

    pub fun isIssued(issuer: Address): Bool {
        let case = self.account.borrow<&Case>(from: self.CaseStoragePath)
            ?? panic("Could not borrow case receiver")
        return case.balance[issuer] != nil
    }

    pub fun issue(account: AuthAccount) {
        pre {
            self.isIssued(issuer: account.address) == false : "can not issue again"
        }

        let tempCase <- create Case(balance: self.issuanceLimit, issuer: account.address)

        let case = self.account.borrow<&Case{Receiver}>(from: self.CaseStoragePath)
            ?? panic("Could not borrow case receiver")

        case.deposit(from: <- tempCase)
    }

    pub resource interface WishlistPublic {
        // The whole wishlist
        // key: wisher's Address
        // value: 
        //     key: issuer's Address
        //     value: wished amount
        pub let wishes: {Address: {Address: UFix64}}

        pub fun getWishesByAccount(account: Address): {Address: UFix64}

        pub fun upsertWish(account: AuthAccount, amount: UFix64, issuer: Address)
    }

    pub resource Wishlist: WishlistPublic {
        pub let wishes: {Address: {Address: UFix64}}

        init() {
            self.wishes = {}
        }

        pub fun getWishesByAccount(account: Address): {Address: UFix64} {
            return self.wishes[account] ?? {}
        }

        pub fun upsertWish(account: AuthAccount, amount: UFix64, issuer: Address) {
            pre {
                account.address != issuer : "Can not insert yourself into wishlist"
                amount >= 0.0 : "Amount can not be lesser than zero"
                // TODO: check if issuer's account is initialized
            }

            if amount == 0.0 {
                self.wishes[account.address]!.remove(key: issuer)
            } else {
                if self.wishes[account.address] == nil {
                    self.wishes[account.address] = { issuer: amount }
                } else {
                    let accountWishes = &self.wishes[account.address]! as &{Address: UFix64}
                    if accountWishes != nil {
                        accountWishes[issuer] = amount
                    }
                }
            }
        }
    }

    pub fun borrowCase(): &{Receiver, Balance} {
        let cap = self.account.getCapability<&Case{Receiver, Balance}>(self.CasePublicPath)
        let case = cap.borrow() ?? panic("Could not borrow case revceiver & balance")
        return case
    }

    pub fun borrowWishlist(): &{WishlistPublic} {
        let cap = self.account.getCapability<&Wishlist{WishlistPublic}>(self.WishlistPublicPath)
        let wishlist = cap.borrow() ?? panic("Could not borrow wishlist public")
        return wishlist
    }
}
