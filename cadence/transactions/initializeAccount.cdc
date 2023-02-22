import Bonos from 0x01

transaction() {
    prepare(account: AuthAccount) {
        account.save(<- Bonos.createPouch(account: account), to: Bonos.PouchStoragePath)
        account.link<&Bonos.Pouch{Bonos.Receiver, Bonos.Balance}>(Bonos.PouchPublicPath, target: Bonos.PouchStoragePath)
        account.link<&Bonos.Pouch>(Bonos.PouchPrivatePath, target: Bonos.PouchStoragePath)
    }
}
