var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'API4',
    'postgres',
    '23agosto',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;