const transactionDb = require('../persistence/transactiondb')
const logger = require('log')
const error = require('../utils/error')

const Transaction = {
    createTransaction: (transaction) => {
        logger.info(`createTransaction transaction: ${transaction}`)
        const date = new Date()
        const isoDate = date.toISOString()
    
        const { amount, type } = transaction
    
        return transactionDb.createTransaction(amount, type, isoDate)
    },
    getTransactions:() => {
        logger.info('getTransactions method')
        return transactionDb.getTransactions()
    },
    getTransactionById:(id) => {
        logger.info(`getTransactionById id: ${id}`)
        if(isNaN(id)) return Promise.reject(error.httpError('Invalid ID supplied', 400))
    
        return transactionDb.getTransactionById(id)
    }
};

module.exports = Transaction;