const Partida = require('../models/Partida');
const Atleta = require('../models/Atleta');
const Time = require('../models/Time');

module.exports = {
  async criarPartida(req, res) {
    const { hora, local, timeMandanteId, timeVisitanteId, jogadoresIds } = req.body;

    try {
      // Verifica se o time mandante existe
      const timeMandante = await Time.findByPk(timeMandanteId);
      if (!timeMandante) {
        return res.status(400).json({ error: 'Time mandante não encontrado' });
      }

      // Verifica se o time visitante existe (se fornecido)
      if (timeVisitanteId) {
        const timeVisitante = await Time.findByPk(timeVisitanteId);
        if (!timeVisitante) {
          return res.status(400).json({ error: 'Time visitante não encontrado' });
        }
      }

      // Cria a partida
      const partida = await Partida.create({ hora, local, timeMandanteId, timeVisitanteId });

      // Adiciona jogadores à partida (opcional)
      if (jogadoresIds && jogadoresIds.length > 0) {
        const jogadores = await Atleta.findAll({
          where: { id: jogadoresIds },
        });
        await partida.addJogadores(jogadores);
      }

      res.status(201).json(partida);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a partida' });
    }
  },

  async listarPartidas(req, res) {
    try {
      const partidas = await Partida.findAll({
        include: [
          { model: Time, as: 'timeMandante' },
          { model: Time, as: 'timeVisitante' },
          { model: Atleta, as: 'jogadores' },
        ],
      });

      res.status(200).json(partidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as partidas' });
    }
  },
};
