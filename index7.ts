import { Digits, isDigits, Size, hasSize } from 'taghiro';

describe("types can be verbs as well as nouns", () => {
    type CreditCardNumber = string & Digits & Size<16>
    type AccountNumber = string & Digits & Size<8>
    type SortCode = string & Digits & Size<6>

    type CreditCardMethod = {
        type: 'CREDITCARD'
        cardNumber: CreditCardNumber
    }
    type ChequeMethod = {
        type: 'CHEQUE'
        account: AccountNumber
        sortCode: SortCode
    }
    type CollectMethod = {
        type: 'COLLECT'
        account: AccountNumber
        sortCode: SortCode
    }
    type PaymentMethod = CreditCardMethod | ChequeMethod | CollectMethod
    type RefundPayment = (name: string, pm: PaymentMethod, amount: number) => string

    const refund: RefundPayment = function(name, pm, amount) {
        switch (pm.type) {
            case 'CREDITCARD':
                return `transferring ${amount} to ${name}, ${pm.cardNumber}`
            case 'CHEQUE':
                const sc = pm.sortCode;
                const sortCode = `${sc.substring(0, 2)}-${sc.substring(2, 2)}-${sc.substring(4, 2)}`
                return `writing cheque for ${amount} to ${name}, A/C: ${pm.account} Sort: ${sortCode}`
        }
    }

    test("credit card details are valid", () => {
        const cn = '1234567812345678'
        if (!isDigits(cn) || !hasSize(cn, 16))
            throw "Not a valid credit card number"
        console.log(refund('Mike', { type: 'CREDITCARD', cardNumber: cn }, 100))
    })

    test("bank account details are valid", () => {
        const ac = '12345679'
        const sc = '102030'
        if (!isDigits(ac) || !hasSize(ac, 8))
            throw "Not a valid account number"
        if (!isDigits(sc) || !hasSize(sc, 6))
            throw "Not a valid sort code"
        console.log(refund('Mike', { type: 'CHEQUE', account: ac, sortCode: sc }, 100))
    })
})