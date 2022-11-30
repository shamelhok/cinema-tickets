import { isValidAccountId } from "../src/pairtest/lib/utils";


describe('isValidAccountId', () => {
    test('returns true for positive integers',()=>{
        expect(isValidAccountId(1)).toBe(true)
        expect(isValidAccountId(10)).toBe(true)
        expect(isValidAccountId(3454354)).toBe(true)
    })
    test('returns false for non-positive integers',()=>{
        expect(isValidAccountId(0)).toBe(false)
        expect(isValidAccountId(-1)).toBe(false)
        expect(isValidAccountId(-13454354)).toBe(false)
    })
    test('returns false for non integers',()=>{
        expect(isValidAccountId(1.01)).toBe(false)
        expect(isValidAccountId(0.1)).toBe(false)
        expect(isValidAccountId(3.000001)).toBe(false)
    })
    test('returns false for non numbers',()=>{
        expect(isValidAccountId('1')).toBe(false)
        expect(isValidAccountId('')).toBe(false)
        expect(isValidAccountId(undefined)).toBe(false)
        expect(isValidAccountId(null)).toBe(false)
        expect(isValidAccountId({})).toBe(false)
    })
});
