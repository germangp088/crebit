const knex = require('./knex'),
logger = require('log')

const TransactionDB = {
    createTransaction: (amount, type, effectiveDate) => {
        logger.info(`getTransactionById amount: ${amount}, type: ${type}, effectiveDate: ${effectiveDate}`)
        logger.info('transaction.db.js inside createTransaction method')
        return knex("transaction").insert({amount, type, effectiveDate})
    },
    getTransactions: () => {
        logger.info('getTransactions')
        return knex('transaction').select('transaction_id', 'type', 'amount', 'effectiveDate')
    },
    getTransactionById: (transaction_id) => {
        logger.info(`getTransactionById transaction_id: ${transaction_id}`)
        return knex('transaction').where({transaction_id}).select('transaction_id', 'type', 'amount', 'effectiveDate')
    }
}


module.exports = TransactionDB;