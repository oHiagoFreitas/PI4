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

const EquipeSombraAtletas = sequelize.define('EquipeSombraAtletas', {
    posicaoId: {
        type: Sequelize.STRING,  // Título da posição
        allowNull: false,
    }
}, {
    timestamps: false, // Não usamos timestamps na tabela de junção
});

// Relacionamento muitos-para-muitos com Atletas (jogadores)
EquipeSombra.belongsToMany(Atleta, {
    through: EquipeSombraAtletas,  // Tabela de junção explícita
    as: 'atletas',
    foreignKey: 'equipeSombraId',  // Chave estrangeira da EquipeSombra
    otherKey: 'atletumId',          // Chave estrangeira de Atleta
});

Atleta.belongsToMany(EquipeSombra, {
    through: EquipeSombraAtletas,  // Tabela de junção explícita
    as: 'equipesSombra',
    foreignKey: 'atletumId',        // Chave estrangeira de Atleta
    otherKey: 'equipeSombraId',     // Chave estrangeira de EquipeSombra
});

module.exports = EquipeSombra;
