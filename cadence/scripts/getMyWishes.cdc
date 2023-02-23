import Bonos from 0x01

pub fun main(account: Address): {Address: UFix64} {
    let wishlist = Bonos.borrowWishlist()
    return wishlist.getWishesByAccount(account: account)
}
