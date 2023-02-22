import Bonos from 0x01

pub fun main(account: Address): Bool {
    let wishlist: &Bonos.Wishlist
    
    wishlist = Bonos.borrow<&Bonos.Wishlist>(from: Bonos.WishlistPublicPath)
        ?? panic("Could not borrow Wishlist")

    return wishlist.getMyWishes(account)
}
