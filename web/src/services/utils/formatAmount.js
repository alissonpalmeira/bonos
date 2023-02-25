
export const formatAmount = (amount) => {
    if (amount===undefined || amount===null) amount = 0;
 
    const signed = amount < 0;
    amount = amount.toString()
    amount = amount.replace('-', '');
    amount = amount.padStart(3, '0');
    amount = amount.slice(0, -2) + '.' + amount.slice(-2)
    if (amount.length > 6) amount = amount.slice(0, -6) + ',' + amount.slice(-6)
    if (amount.length > 10) amount = amount.slice(0, -10) + ',' + amount.slice(-10)
    amount = amount.slice(-14);
    if (signed) amount = '-' + amount;
    
    return amount;
}
