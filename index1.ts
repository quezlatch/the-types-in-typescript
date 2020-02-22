namespace Types {
    type PaymentMethod = {
        type: 'CREDITCARD' | 'CHEQUE'
        cardNumber?: string
        account?: string
        sortCode?: string
    }

    function refund(name: string, pm: PaymentMethod, amount: number) {
        switch (pm.type) {
            case 'CREDITCARD':
                return `transferring ${amount} to ${name}, ${pm.account}`
            case 'CHEQUE':
                const sc = pm.sortCode;
                const sortCode = `${sc.substring(0, 2)}-${sc.substring(2, 2)}-${sc.substring(4, 2)}`
                return `writing cheque for ${amount} to ${name}, A/C: ${pm.account} Sort: ${sortCode}`
        }
    }

    const cn = '1234567812345678'
    const ac = '1234567'
    const sc = 102030

    console.log(refund('Mike', { type: 'CREDTCARD', cardNumber: cn }, 100))

    console.log(refund('Mike', { type: 'CHEQUE', account: ac, sortCode: sc }, 100))
}