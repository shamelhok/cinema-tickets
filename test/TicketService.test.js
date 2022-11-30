import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException';
import TicketService from '../src/pairtest/TicketService'

describe('TicketService',()=>{
    const ticketService= new TicketService()
    test('should throw error for invalid accountId', () => {
        expect(()=>{ticketService.purchaseTickets(0)}
        ).toThrow(InvalidPurchaseException)
    });
})