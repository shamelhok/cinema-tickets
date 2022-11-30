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
    });
})