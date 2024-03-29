import { Digits, isDigits, Size, hasSize } from 'taghiro';

describe("add domain constraints using tag types (and taghiro)", () => {
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

    test("credit card details are valid", () => {
        const cn = '1234567812345678'
        if (!isDigits(cn) || !hasSize(cn, 16))
            throw "Not a valid credit card number"
        console.log(refund('Mike', { type: 'CREDITCARD', cardNumber: cn }, 100))
    })

    test("bank account details are valid", () => {
        const ac = '1234567'
        const sc = '102030'
        if (!isDigits(sc) || !hasSize(sc, 6))
            throw "Not a valid sort code"
        console.log(refund('Mike', { type: 'CHEQUE', account: ac, sortCode: sc }, 100))
    })
})