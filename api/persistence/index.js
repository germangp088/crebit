const knex = require('./knex'),
BalanceDb = require('../persistence/balancedb'),
User = require('../user');

const createTables = () => {
    knex.schema.hasTable('transaction').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('transaction', (t) => {
                t.increments('transaction_id').primary();
                t.string('type', 100);
                t.bigInteger('amount');
                t.string('effectiveDate', 100);
            });
        }
    }).then(()=> {
        knex.schema.hasTable('balance').then((exists) => {
            if (!exists) {
                knex.schema.createTable('balance', (t) => {
                    t.increments('balance_id').primary();
                    t.bigInteger('amount');
                    return t;
                }).then(async (t) => {
                    const result = await BalanceDb.createAmount(0);
                    User.id = result["0"];
                    return t;
                });
            }
        })
    });
}

module.exports = {
    createTables
}