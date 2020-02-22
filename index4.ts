namespace Alias2Types {
    interface Tag<S extends string> {
        readonly __tag: S;
    }

    type CreditCardNumber = string & Tag<'credit-card-number'>
    type AccountNumber = string & Tag<'account-number'>
    type SortCode = string & Tag<'sort-code'>

    type CreditCardMethod = {
        type: 'CREDITCARD'
        cardNumber: CreditCardNumber
    }
    type ChequeMethod = {
        type: 'CHEQUE'
        account: AccountNumber
        sortCode: SortCode
    }
    type PaymentMethod = CreditCardMethod | ChequeMethod

    function refund(name: string, pm: PaymentMethod, amount: number) {
        switch (pm.type) {
            case 'CREDITCARD':
                return `transferring ${amount} to ${name}, ${pm.cardNumber}`
            case 'CHEQUE':
                const sc = pm.sortCode;
                const sortCode = `${sc.substring(0, 2)}-${sc.substring(2, 2)}-${sc.substring(4, 2)}`
                return `writing cheque for ${amount} to ${name}, A/C: ${pm.account} Sort: ${sortCode}`
        }
    }

    const cn = '1234567812345678' as CreditCardNumber
    const sc = '1234567' as SortCode
    const ac = '102030' as AccountNumber

    console.log(refund('Mike', { type: 'CREDITCARD', cardNumber: cn }, 100))

    console.log(refund('Mike', { type: 'CHEQUE', account: sc, sortCode: ac }, 100))
}