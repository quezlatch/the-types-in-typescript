namespace AliasTypes {
    type CreditCardNumber = string
    type AccountNumber = string
    type SortCode = string

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

    const cn = '1234567812345678'
    const sc = '1234567'
    const ac = '102030'

    console.log(refund('Mike', { type: 'CREDITCARD', cardNumber: cn }, 100))

    console.log(refund('Mike', { type: 'CHEQUE', account: sc, sortCode: ac }, 100))
}