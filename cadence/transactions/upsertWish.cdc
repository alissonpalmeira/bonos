import Bonos from 0x01

transaction(amount: UFix64, issuer: Address) {
    
    prepare(account: AuthAccount) {
        let wishlist = Bonos.borrow<&Bonos.Wishlist>(from: Bonos.WishlistPublicPath)
            ?? panic("Could not borrow Wishlist")  

        wishlist.upsertWish(account, amount: amount, issuer: issuer)
    }
}