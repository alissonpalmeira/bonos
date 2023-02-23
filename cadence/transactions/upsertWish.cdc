import Bonos from 0x01

transaction(amount: UFix64, issuer: Address) {
    let account: AuthAccount
    let wishlist: &{Bonos.WishlistPublic}

    prepare(account: AuthAccount) {
        self.account = account
        self.wishlist = Bonos.borrowWishlist()
    }

    execute {
        self.wishlist.upsertWish(account: self.account, amount: amount, issuer: issuer)
    }    
}