// src/models/EquipeSombra.js

const Sequelize = require('sequelize');
const sequelize = require('../database');
const Formacao = require('./Formacao');
const Atleta = require('./Atleta'); // Associar jogadores

const EquipeSombra = sequelize.define('equipeSombra', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    formacaoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Formacao,
            key: 'id',
        },
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'ativo',
    }
}, {
    timestamps: true, // Mantém o createdAt e updatedAt
});

// Associações
EquipeSombra.belongsTo(Formacao, { foreignKey: 'formacaoId' });
Formacao.hasMany(EquipeSombra, { foreignKey: 'formacaoId' });

// Relacionamento muitos-para-muitos com Atletas (jogadores)
EquipeSombra.belongsToMany(Atleta, {
    through: 'EquipeSombraAtletas', 
    as: 'atletas',
    foreignKey: 'equipeSombraId',  // Chave estrangeira da EquipeSombra
    otherKey: 'atletumId',          // Chave estrangeira de Atleta
    timestamps: false               // Não precisamos dos timestamps na tabela de junção
});

Atleta.belongsToMany(EquipeSombra, {
    through: 'EquipeSombraAtletas',
    as: 'equipesSombra',
    foreignKey: 'atletumId',        // Chave estrangeira de Atleta
    otherKey: 'equipeSombraId',     // Chave estrangeira de EquipeSombra
    timestamps: false               // Não precisamos dos timestamps na tabela de junção
});

module.exports = EquipeSombra;
