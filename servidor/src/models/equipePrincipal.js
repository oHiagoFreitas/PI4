const Sequelize = require('sequelize');
const sequelize = require('../database');
const Formacao = require('./Formacao');
const Atleta = require('./Atleta'); // Associar jogadores

const EquipePrincipal = sequelize.define('equipePrincipal', {
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
EquipePrincipal.belongsTo(Formacao, { foreignKey: 'formacaoId' });
Formacao.hasMany(EquipePrincipal, { foreignKey: 'formacaoId' });

const EquipePrincipalAtletas = sequelize.define('EquipePrincipalAtletas', {
    posicaoId: {
        type: Sequelize.STRING,  // Título da posição
        allowNull: false,
    }
}, {
    timestamps: false, // Não usamos timestamps na tabela de junção
});

// Relacionamento muitos-para-muitos com Atletas (jogadores)
EquipePrincipal.belongsToMany(Atleta, {
    through: EquipePrincipalAtletas,  // Tabela de junção explícita
    as: 'atletas',
    foreignKey: 'equipePrincipalId',  // Chave estrangeira da EquipePrincipal
    otherKey: 'atletumId',            // Chave estrangeira de Atleta
});

Atleta.belongsToMany(EquipePrincipal, {
    through: EquipePrincipalAtletas,  // Tabela de junção explícita
    as: 'equipesPrincipais',
    foreignKey: 'atletumId',           // Chave estrangeira de Atleta
    otherKey: 'equipePrincipalId',    // Chave estrangeira de EquipePrincipal
});

module.exports = EquipePrincipal;
