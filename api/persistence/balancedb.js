const knex = require('./knex'),
logger = require('log')

const BalanceDB = {
    getAmountById: (balance_id) => {
        logger.info(`getAmountById balance_id: ${balance_id}`)
        return knex('balance').where({balance_id}).select('balance_id', 'amount')
    },
    updateAmount: (balance_id, amount) => {
        logger.info(`updateAmount balance_id: ${balance_id}, amount: ${amount}`)
        return knex("balance").where({balance_id}).update({amount})
    },
    createAmount: (amount) => {
        logger.info(`createAmount amount: ${amount}`)
        return knex("balance").insert({amount})
    }
};

module.exports = BalanceDB;