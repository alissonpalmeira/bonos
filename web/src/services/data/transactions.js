
export const INIT_ACCOUNT = `
import Bonos from 0xBonos

transaction() {
    prepare(account: AuthAccount) {
        account.save(<- Bonos.createCase(account: account), to: Bonos.CaseStoragePath)
        account.link<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath, target: Bonos.CaseStoragePath)
        account.link<&Bonos.Case>(Bonos.CasePrivatePath, target: Bonos.CaseStoragePath)

        Bonos.issue(account: account)
    }
}
`;

export const UPSERT_WISH = `
import Bonos from 0xBonos

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
`;