import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import {isValidAccountId} from './lib/utils.js'
export default class TicketService {
  #isValidAccountId= isValidAccountId;
  #InvalidPurchaseException= InvalidPurchaseException
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    if(! this.#isValidAccountId(accountId)){
       throw new this.#InvalidPurchaseException('accountId must be a positive integer')
    }
  }
}
