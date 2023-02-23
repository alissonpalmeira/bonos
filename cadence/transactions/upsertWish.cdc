import Bonos from "../contracts/Bonos.cdc"

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