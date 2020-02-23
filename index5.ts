import { Digits, Size } from 'taghiro';

describe("use taghiro tagged types to add domain constraints", () => {
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

    const cn = '1234567812345678'
    const sc = '1234567'
    const ac = '102030'

    test("refund to credit card", () =>
        expect(refund('Mike', { type: 'CREDITCARD', cardNumber: cn }, 100))
            .toEqual('transferring 100 to Mike, 1234567812345678'))

    test("refund to cheque", () =>
        expect(refund('Mike', { type: 'CHEQUE', account: ac, sortCode: sc }, 100))
            .toEqual('writing cheque for 100 to Mike, A/C: 1234567 Sort: 10-20-30'))
})