import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import {extractTickets, isValidAccountId} from './lib/utils.js'
export default class TicketService {
  #isValidAccountId= isValidAccountId;
  #extractTickets= extractTickets
  #invalidAccountIdException= new InvalidPurchaseException('accountId must be a positive integer')
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    if(! this.#isValidAccountId(accountId)){
       throw this.#invalidAccountIdException
    }
    const tickets = this.#extractTickets(...ticketTypeRequests)


    const seatsRequired=tickets.ADULT+tickets.CHILD
    const priceInPounds = tickets.ADULT*20 + tickets.CHILD*10
    
  }
}
