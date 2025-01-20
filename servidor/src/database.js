var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'pi4_bd_qupu',
    'pi4_bd_qupu_user',
    'F7oAZKjvTctKSZtOf7oyWHskZcOUB9QZ',
    {
        host: 'dpg-cu7a8hqj1k6c73fjeqng-a.frankfurt-postgres.render.com',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Você pode definir como true se tiver um certificado CA válido
            }
        }
    }
);

module.exports = sequelize;