const dbConfig = {
    client: 'sqlite3',
    connection: {filename: ':memory:'},
    useNullAsDefault: true
};

module.exports = require('knex')(dbConfig);
