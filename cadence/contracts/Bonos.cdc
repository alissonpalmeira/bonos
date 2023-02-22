 
pub contract Bonos {
    pub let initialBalance: UFix64

    pub let PouchStoragePath: StoragePath
    pub let PouchPrivatePath: PrivatePath
    pub let PouchPublicPath: PublicPath

    pub let WishlistStoragePath: StoragePath
    pub let WishlistPrivatePath: PrivatePath
    pub let WishlistPublicPath: PublicPath

    pub event ContractInitialized()
    
    init() {
        self.initialBalance = 100.0

        self.PouchStoragePath = StoragePath(identifier: "bonosPouch") ?? panic("Could not set storage path")
        self.PouchPrivatePath = PrivatePath(identifier: "bonosPouch") ?? panic("Could not set private path")
        self.PouchPublicPath = PublicPath(identifier: "bonosPouch") ?? panic("Could not set public path")

        self.WishlistStoragePath = StoragePath(identifier: "bonosWishlist") ?? panic("Could not set storage path")
        self.WishlistPrivatePath = PrivatePath(identifier: "bonosWishlist") ?? panic("Could not set private path")
        self.WishlistPublicPath = PublicPath(identifier: "bonosWishlist") ?? panic("Could not set public path")

        self.account.save(<- create Wishlist(), to: self.WishlistStoragePath)
        self.account.link<&Wishlist{WishlistPublic}>(self.WishlistPublicPath, target: self.WishlistStoragePath)
        self.account.link<&Wishlist>(self.WishlistPrivatePath, target: self.WishlistStoragePath)
 
        emit ContractInitialized()
    }

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

    pub resource interface WishlistPublic {
        // The total balance per issuer of the Pouch
        // key: wisher's Address
        // value: 
        //     key: issuer's Address
        //     value: wished amount
        pub let wishes: {Address: {Address: UFix64}}

        pub fun getMyWishes(account: AuthAccount): {Address: UFix64}
        pub fun upsertWish(account: AuthAccount, amount: UFix64, issuer: Address)
    }

    pub resource interface WishlistPrivate {
        access(account) fun getWishes(): {Address: {Address: UFix64}}
    }

    pub resource Wishlist: WishlistPublic, WishlistPrivate {
        pub let wishes: {Address: {Address: UFix64}}

        init() {
            self.wishes = {}
        }

        pub fun getMyWishes(account: AuthAccount): {Address: UFix64} {
            return self.wishes[account.address] ?? {}
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
                let accountWishes = &self.wishes[account.address]! as &{Address: UFix64}
                accountWishes[issuer] = amount
            }
        }

        access(account) fun getWishes(): {Address: {Address: UFix64}}{
            return self.wishes
        }
    }
}
