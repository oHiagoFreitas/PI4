const Sequelize = require('sequelize');
const sequelize = require('../database');

const Formacao = sequelize.define('formacao', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que não haja duplicatas
    }
}, {
    timestamps: false,
});

Formacao.initDefaultFormacoes = async () => {
    const defaultFormacoes = [
        "3-4-3", "3-5-2", "4-3-3", "4-2-4", "4-4-2", "4-2-3-1", "5-2-3", "5-3-2", "5-4-1"
    ];

    for (const nome of defaultFormacoes) {
        await Formacao.findOrCreate({ where: { nome } });
    }
};

module.exports = Formacao;
