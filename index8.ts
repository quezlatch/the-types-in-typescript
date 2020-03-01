describe("create generic type for test builders", () => {
    type AccountNumber = string
    type SortCode = string

    type ChequeMethod = {
        type: 'CHEQUE'
        account: AccountNumber
        sortCode: SortCode
    }

    type BuilderBit<T, K extends keyof T> = Partial<Pick<T, Exclude<keyof T, K>>>
    //type BuilderBit<T, K extends keyof T> = { [P in keyof T]?: (P extends K ? never : T[P]) }

    function buildChequeMethod({ account, sortCode }: BuilderBit<ChequeMethod, 'type'> = {}): ChequeMethod {
        return {
            type: 'CHEQUE',
            account: (account || '00000000') as AccountNumber,
            sortCode: (sortCode || '000000') as SortCode
        }
    }

    test("with defaults", () =>
        expect(buildChequeMethod())
            .toEqual({ type: 'CHEQUE', account: '00000000', sortCode: '000000' }))

    test("override defaults with sort code", () =>
        expect(buildChequeMethod({ sortCode: '123456' }))
            .toEqual({ type: 'CHEQUE', account: '00000000', sortCode: '123456' }))

    test("override defaults with account and sort code", () =>
        expect(buildChequeMethod({ account: '12345678', sortCode: '101010' }))
            .toEqual({ type: 'CHEQUE', account: '12345678', sortCode: '101010' }))
})
