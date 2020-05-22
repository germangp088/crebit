const BalanceDb = require('../persistence/balancedb'),
logger = require('log'),
User = require('../user'),
error = require('../utils/error')

const Balance = {
    updateAmount: async (transaction) => {
        logger.info(`updateAmount transaction: ${transaction}`)
        const { amount, type } = transaction
        const  { id } = User;
    
        const balances = await BalanceDb.getAmountById(id)
        if (balances.length !== 0) {
            const balanceById = balances[0]
            const newAmount = type === 'credit' ? balanceById.amount + amount : balanceById.amount - amount
            if (newAmount < 0)
                return Promise.reject(error.httpError('The amount cannot be negative', 409))
            return BalanceDb.updateAmount(id, newAmount)
        }
        else if (type === 'debit'){
           return Promise.reject(error.httpError('The amount cannot be negative', 409))
        }
    },
    getBalance: async () => {
        logger.info('getBalance method')
        const balances = await BalanceDb.getAmountById(User.id);
        return balances.length !== 0 ? balances[0].amount : 0;
    }
}

module.exports = Balance