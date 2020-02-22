namespace TagTypes {
    type AccountNumber = string
    type SortCode = string

    type ChequeMethod = {
        type: 'CHEQUE'
        account: AccountNumber
        sortCode: SortCode
    }

    type BuilderBitUsingPredefined<T, K extends keyof T> = Partial<Pick<T, Exclude<keyof T, K>>>
    type BuilderBit<T, K extends keyof T> = { [P in keyof T]?: (P extends K ? never : T[P]) }

    function buildChequeMethod({ account, sortCode }: BuilderBit<ChequeMethod, 'type'> = {}): ChequeMethod {
        return {
            type: 'CHEQUE',
            account: (account || '00000000') as AccountNumber,
            sortCode: (sortCode || '000000') as SortCode
        }
    }

    const defaultChequeMethod = buildChequeMethod()
    const chequeMethodWithSortCode = buildChequeMethod({ sortCode: '123456' })
    const chequeMethodWithAccountAndSortCode = buildChequeMethod({ account: '12345678', sortCode: '101010' })
}