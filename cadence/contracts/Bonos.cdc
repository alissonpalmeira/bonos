 
pub contract Bonos {
    pub let initialBalance: UFix64
    pub let issuanceLimit: UFix64

    pub let CaseStoragePath: StoragePath
    pub let CasePrivatePath: PrivatePath
    pub let CasePublicPath: PublicPath

    pub let WishlistStoragePath: StoragePath
    pub let WishlistPrivatePath: PrivatePath
    pub let WishlistPublicPath: PublicPath

    pub let AdminStoragePath: StoragePath

    pub event ContractInitialized()
    pub event Exchanged()
    
    init() {
        // Initialize contract constants
        self.initialBalance = 0.0
        self.issuanceLimit = 100.0

        self.CaseStoragePath = StoragePath(identifier: "bonosCase") ?? panic("Could not set storage path")
        self.CasePrivatePath = PrivatePath(identifier: "bonosCase") ?? panic("Could not set private path")
        self.CasePublicPath = PublicPath(identifier: "bonosCase") ?? panic("Could not set public path")

        self.WishlistStoragePath = StoragePath(identifier: "bonosWishlist") ?? panic("Could not set storage path")
        self.WishlistPrivatePath = PrivatePath(identifier: "bonosWishlist") ?? panic("Could not set private path")
        self.WishlistPublicPath = PublicPath(identifier: "bonosWishlist") ?? panic("Could not set public path")

        self.AdminStoragePath = StoragePath(identifier: "bonosAdmin") ?? panic("Could not set storage path")

        // Create the contract account Case
        self.account.save(<- Bonos.createCase(account: self.account), to: Bonos.CaseStoragePath)
        self.account.link<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath, target: Bonos.CaseStoragePath)
        self.account.link<&Bonos.Case>(Bonos.CasePrivatePath, target: Bonos.CaseStoragePath)

        // Create the contract account Wishlist
        self.account.save(<- create Wishlist(), to: self.WishlistStoragePath)
        self.account.link<&Wishlist{WishlistPublic}>(self.WishlistPublicPath, target: self.WishlistStoragePath)
        self.account.link<&Wishlist>(self.WishlistPrivatePath, target: self.WishlistStoragePath)
 
        // Create the contract admin resource
        self.account.save(<- create Admin(), to: self.AdminStoragePath)
        
        // Emit ContractInitialized event
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
            pre {
                from.balance.length == 1 : "Must deposit from only one issuer"
                (from.balance[from.balance.keys[0]] ?? 0.0) >= 0.0 : "Invalid balance"
            }
            post {
                self.balance[issuer] == balance + amount : "New Case balance@issuer must be the sum of the previous balance@issuer and the deposited Case"
            }

            let issuer = from.balance.keys[0]
            let balance = self.balance[issuer] ?? 0.0
            let amount = from.balance[issuer] ?? 0.0

            self.balance[issuer] = balance + amount
            
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

    pub resource Admin {
        // Only an admin can create new Admins
        pub fun createAdmin(): @Admin {
            return <-create Admin()
        }

        pub fun exchange(amount: UFix64, receivers: [Address], providers: [Address]) {
            pre {
                receivers.length == providers.length : "receivers and providers arrays must have the same size"
            }

            let contractCase = Bonos.account.borrow<&Case>(from: Bonos.CaseStoragePath)
                ?? panic("Could not borrow case receiver")
            let wishlist = Bonos.borrowWishlist()
            
            var index = 0
            while index < receivers.length {
                let receiver = receivers[index]
                let provider = providers[index]

                // TODO> check if provider account is initialized
                // TODO> check if receiver account is initialized

                let providerBalance = (contractCase.balance[provider] ?? 0.0)
                if providerBalance - amount < 0.0 {
                    panic("Insufficient balance from ".concat(provider.toString()))
                }
                
                let receivertWishes = &wishlist.wishes[receiver]! as &{Address: UFix64}
                if receivertWishes == nil {
                    panic("No wish from ".concat(receiver.toString()))
                }

                let receiverWishToProvider = receivertWishes[provider] ?? 0.0
                if receiverWishToProvider - amount < 0.0 {
                    panic("No wish from ".concat(receiver.toString()))
                }

                let providerAccount = getAccount(provider)
                let cap = providerAccount.getCapability<&Case{Receiver}>(Bonos.CasePublicPath)
                let providerCase = cap.borrow()
                    ?? panic("Could not borrow case receiver")

                let tempCase <- contractCase.withdraw(amount: amount, issuer: provider)
                providerCase.deposit(from: <- tempCase)
                
                if (receiverWishToProvider - amount == 0.0){
                    receivertWishes.remove(key: provider)
                }
                else{
                    receivertWishes[provider] = receiverWishToProvider - amount
                }
                
                index = index + 1
            }

            emit Exchanged()
        }
    }
    
    // Public Functions
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
 