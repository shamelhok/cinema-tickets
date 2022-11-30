export function isValidAccountId(accountId){
    return Number.isInteger(accountId)&& accountId>0
}