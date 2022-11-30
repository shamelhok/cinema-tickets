import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import TicketService from '../src/pairtest/TicketService'

describe('TicketService',()=>{
    const ticketService= new TicketService()
    test('should throw error for invalid accountId', () => {
        expect(()=>{ticketService.purchaseTickets(0,new TicketTypeRequest('ADULT',1))}
        ).toThrow(InvalidPurchaseException)
    });
    test('should throw error for invalid ticketTypeRequests', () => {
        expect(()=>{ticketService.purchaseTickets(1,'asds')}
        ).toThrow(InvalidPurchaseException)
        expect(()=>{ticketService.purchaseTickets(1,
            new TicketTypeRequest('INFANT',2)
            )}
        ).toThrow(InvalidPurchaseException)
        expect(()=>{ticketService.purchaseTickets(1,
            new TicketTypeRequest('ADULT',21)
            )}
        ).toThrow(InvalidPurchaseException)
    });
    test('should return true with no errors for valid purchase', () => {
        expect(ticketService.purchaseTickets(2, 
            new TicketTypeRequest('ADULT',1)
            )).toBe(true)
        expect(ticketService.purchaseTickets(1231232, 
            new TicketTypeRequest('ADULT',1),
            new TicketTypeRequest('ADULT',1),
            new TicketTypeRequest('ADULT',1),
            new TicketTypeRequest('ADULT',1)
            )).toBe(true)
        expect(ticketService.purchaseTickets(2, 
            new TicketTypeRequest('ADULT',10),
            new TicketTypeRequest('CHILD',1),
            new TicketTypeRequest('INFANT',4)
            )).toBe(true)
        expect(ticketService.purchaseTickets(2, 
            new TicketTypeRequest('ADULT',10),
            new TicketTypeRequest('INFANT',0),
            new TicketTypeRequest('CHILD',10)
            )).toBe(true)
    });
})