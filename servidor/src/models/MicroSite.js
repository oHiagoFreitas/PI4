const Sequelize = require('sequelize');
const sequelize = require('../database'); // ajuste o caminho conforme necessário

const Microsite = sequelize.define('microsite', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false, // Não permite que o campo fique vazio
    },
    mensagem: {
        type: Sequelize.TEXT, // Campo para mensagens mais longas
        allowNull: false, // Não permite que o campo fique vazio
    },
}, {
    timestamps: true, // Inclui os campos createdAt e updatedAt
});

module.exports = Microsite;
