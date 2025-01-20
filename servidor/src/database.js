var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'pi4_bd_qupu',
    'pi4_bd_qupu_user',
    'F7oAZKjvTctKSZtOf7oyWHskZcOUB9QZ',
    {
        host: 'dpg-cu7a8hqj1k6c73fjeqng-a.render.com',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;