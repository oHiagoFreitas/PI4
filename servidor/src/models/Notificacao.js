// Modelo de Notificações (exemplo)

const Sequelize = require('sequelize');
const sequelize = require('../database');
const Utilizadores = require('./Utilizadores');  // Relacionando com o modelo de Utilizadores

const Notificacoes = sequelize.define('notificacoes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mensagem: {  // Certifique-se de que o nome da coluna é 'mensagem'
        type: Sequelize.STRING,
        allowNull: false,  // Não permite valores nulos
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    destinatarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: Utilizadores,
            key: 'id',
        },
        allowNull: false,
    },
    remetenteId: {
        type: Sequelize.INTEGER,
        references: {
            model: Utilizadores,
            key: 'id',
        },
        allowNull: false,
    },
    lida: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

// Relacionamento entre as notificações e os utilizadores (remetente e destinatário)
Notificacoes.belongsTo(Utilizadores, { as: 'destinatario', foreignKey: 'destinatarioId' });
Notificacoes.belongsTo(Utilizadores, { as: 'remetente', foreignKey: 'remetenteId' });

module.exports = Notificacoes;
