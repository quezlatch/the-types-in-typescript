function refund(name, pm, amount) {
    switch (pm.type) {
        case 'CREDITCARD':
            return `transferring ${amount} to ${name}, ${pm.account}`
        case 'CHEQUE':
            const sc = pm.sortCode;
            const sortCode = `${sc.subString(0, 2)}-${sc.subString(2, 2)}-${sc.subString(4, 2)}`
            return `writing cheque for ${amount} to ${name}, A/C: ${pm.account} Sort: ${sortCode}`
    }
}

const cn = '1234567812345678'
const ac = '1234567'
const sc = 102030

console.log(refund('Mike', { type: 'CREDTCARD', cardNumber: cn }, 100))

console.log(refund('Mike', { type: 'CHEQUE', account: ac, sortCode: sc }, 100))
