import Bonos from "../contracts/Bonos.cdc"

pub fun main(): {Address: {Address: UFix64}} {
    let wishlist = Bonos.borrowWishlist()
    return wishlist.wishes
}
