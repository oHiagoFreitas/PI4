// src/models/EquipeSombra.js

const Sequelize = require('sequelize');
const sequelize = require('../database');
const Formacao = require('./Formacao'); // Ajuste o caminho conforme necessário
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
    // Podemos adicionar um campo de estado, se necessário (ativo/inativo, etc)
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

// Relacionamento com Atletas (jogadores que fazem parte da equipe)
EquipeSombra.belongsToMany(Atleta, { through: 'EquipeSombraAtletas', as: 'atletas' });
Atleta.belongsToMany(EquipeSombra, { through: 'EquipeSombraAtletas', as: 'equipesSombra' });

module.exports = EquipeSombra;
