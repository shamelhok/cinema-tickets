import InvalidPurchaseException from "./InvalidPurchaseException"
import TicketTypeRequest from "./TicketTypeRequest"

export function isValidAccountId(accountId){
    return Number.isInteger(accountId)&& accountId>0
}
export function extractTickets(...ticketTypeRequests){
    const tickets={
        ADULT:0,
        CHILD:0,
        INFANT:0
    }
    for(let ticketTypeRequest of ticketTypeRequests){
        if(ticketTypeRequest instanceof TicketTypeRequest){
        let type = ticketTypeRequest.getTicketType()
        let amount = ticketTypeRequest.getNoOfTickets()
        tickets[type]+= amount
        } else throw new InvalidPurchaseException('invalid ticketTypeRequest')
    }
    return tickets
}
export function isValidPurchase({ADULT,INFANT,CHILD}){
    if(ADULT===0&&INFANT+CHILD>0){
        throw new InvalidPurchaseException('ADULT ticket is required to purchase CHiLD or INFANT tickets')
    }
    if(ADULT+CHILD+INFANT>20){
        throw new InvalidPurchaseException('Only a maximum of 20 tickets that can be purchased at a time')
    }
    // assuming max 1 infant per adult
    if(ADULT< INFANT){
        throw new InvalidPurchaseException('Maximum 1 infant on the lap of each adult')
    }
    return true
}