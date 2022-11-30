import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import { extractTickets, isValidAccountId, isValidPurchase } from "../src/pairtest/lib/utils";


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
describe('extractTickets',()=>{
    test('should return an object with ticket types as keys', () => {
        expect(extractTickets(new TicketTypeRequest('ADULT',1))).toHaveProperty('ADULT')
        expect(extractTickets(new TicketTypeRequest('ADULT',1))).toHaveProperty('CHILD')
        expect(extractTickets(new TicketTypeRequest('ADULT',1))).toHaveProperty('INFANT')
    });
    test('should extract correct amount of tickets', () => {
        let requests = [
            new TicketTypeRequest('ADULT',10),
            new TicketTypeRequest('ADULT',1),
            new TicketTypeRequest('CHILD',0),
            new TicketTypeRequest('CHILD',3)
        ]
        expect(extractTickets(...requests)).toMatchObject({ADULT:11,CHILD:3,INFANT:0})
    });
    test('should throw error if invalid', () => {
        let requests = [{ADULT:1}
        ]
        expect(()=>{extractTickets(...requests)}
        ).toThrow(InvalidPurchaseException)
    });
})
describe('isValidPurchase',()=>{
    test('should throw error for no adults but at least one child or infant', () => {
        expect(()=>{
            isValidPurchase({ADULT:0,INFANT:1,CHILD:0})
        }).toThrow(InvalidPurchaseException)
    });
    test('should throw error for mote infants than adults', () => {
        expect(()=>{
            isValidPurchase({ADULT:1,INFANT:2,CHILD:0})
        }).toThrow(InvalidPurchaseException)
    });
    test('should throw error for no tickets', () => {
        expect(()=>{
            isValidPurchase({ADULT:0,INFANT:0,CHILD:0})
        }).toThrow(InvalidPurchaseException)
    });
    test('should throw error for more than 20 tickets', () => {
        expect(()=>{
            isValidPurchase({ADULT:21,INFANT:0,CHILD:0})
        }).toThrow(InvalidPurchaseException)
        expect(()=>{
            isValidPurchase({ADULT:10,INFANT:10,CHILD:1})
        }).toThrow(InvalidPurchaseException)
    });
    test('should return true for valid purchases', () => {
        expect(isValidPurchase({ADULT:20,INFANT:0,CHILD:0})
        ).toBe(true)
        expect(isValidPurchase({ADULT:1,INFANT:1,CHILD:10})
        ).toBe(true)
        expect(isValidPurchase({ADULT:10,INFANT:10,CHILD:0})
        ).toBe(true)
        expect(isValidPurchase({ADULT:5,INFANT:2,CHILD:4})
        ).toBe(true)
    });
})