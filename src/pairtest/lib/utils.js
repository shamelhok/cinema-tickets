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
        let type = ticketTypeRequest.getTicketType()
        let amount = ticketTypeRequest.getNoOfTickets()
        tickets[type]+= amount
    }
    return tickets
}