import Bonos from "../contracts/Bonos.cdc"

transaction() {
    prepare(account: AuthAccount) {
        account.save(<- Bonos.createCase(account: account), to: Bonos.CaseStoragePath)
        account.link<&Bonos.Case{Bonos.Receiver, Bonos.Balance}>(Bonos.CasePublicPath, target: Bonos.CaseStoragePath)
        account.link<&Bonos.Case>(Bonos.CasePrivatePath, target: Bonos.CaseStoragePath)

        Bonos.issue(account: account)
    }
}
