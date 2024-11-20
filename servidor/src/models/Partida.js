const Sequelize = require('sequelize');
const sequelize = require('../database'); // ajuste o caminho conforme necessário
const Time = require('./Time'); // Importa o modelo Time
const Atleta = require('./Atleta'); // Importa o modelo Atleta

const Partida = sequelize.define('partida', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hora: {
    type: Sequelize.TIME,
    allowNull: false, // Horário do jogo é obrigatório
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false, // Local do jogo é obrigatório
  },
  timeMandanteId: {
    type: Sequelize.INTEGER,
    allowNull: false, // Time mandante é obrigatório
    references: {
      model: Time,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  timeVisitanteId: {
    type: Sequelize.INTEGER,
    allowNull: true, // Time visitante é opcional
    references: {
      model: Time,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true, // Inclui campos createdAt e updatedAt
});

// Relacionamento: Times (Mandante e Visitante)
Partida.belongsTo(Time, { as: 'timeMandante', foreignKey: 'timeMandanteId' });
Partida.belongsTo(Time, { as: 'timeVisitante', foreignKey: 'timeVisitanteId' });

// Relacionamento: Jogadores Participantes
Partida.belongsToMany(Atleta, {
  through: 'PartidaAtleta', // Tabela intermediária para associar jogadores à partida
  foreignKey: 'partidaId',
  otherKey: 'atletaId',
  as: 'jogadores', // Alias para referenciar os jogadores da partida
});

module.exports = Partida;
