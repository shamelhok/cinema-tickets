import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import {
  extractTickets,
  isValidAccountId,
  isValidPurchase,
} from "./lib/utils.js";
export default class TicketService {
  #isValidAccountId = isValidAccountId;
  #extractTickets = extractTickets;
  #isValidPurchase = isValidPurchase;
  #ticketPaymentService= new TicketPaymentService()
  #seatReservationService= new SeatReservationService()
  
  #invalidAccountIdException = new InvalidPurchaseException(
    "accountId must be a positive integer"
  );
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    if (!this.#isValidAccountId(accountId)) {
      throw this.#invalidAccountIdException;
    }
    const tickets = this.#extractTickets(...ticketTypeRequests);
    if (this.#isValidPurchase(tickets)) {
      const seatsRequired = tickets.ADULT + tickets.CHILD;
      const priceInPounds = tickets.ADULT * 20 + tickets.CHILD * 10;
      this.#ticketPaymentService.makePayment(accountId,priceInPounds)
      this.#seatReservationService.reserveSeat(accountId,seatsRequired)
      return true
    } else {
      throw new InvalidPurchaseException("Invalid ticket purchase");
    }
  }
}
