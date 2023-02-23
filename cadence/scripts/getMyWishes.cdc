import Bonos from "../contracts/Bonos.cdc"

pub fun main(account: Address): {Address: UFix64} {
    let wishlist = Bonos.borrowWishlist()
    return wishlist.getWishesByAccount(account: account)
}
