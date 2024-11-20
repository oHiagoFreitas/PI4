// src/controllers/PartidaController.js

const Sequelize = require('sequelize');
const Partida = require('../models/Partida');
const Atleta = require('../models/Atleta');
const Time = require('../models/Time');
const Utilizadores = require('../models/Utilizadores');

module.exports = {
  async criarPartida(req, res) {
    const { data, hora, local, timeMandanteId, timeVisitanteId, jogadoresIds, scoutsIds } = req.body;

    try {
      // Verifica se o time mandante existe
      const timeMandante = await Time.findByPk(timeMandanteId);
      if (!timeMandante) {
        return res.status(400).json({ error: 'Time mandante não encontrado' });
      }

      // Verifica se o time visitante existe (se fornecido)
      let timeVisitante = null; // Usando let para permitir alteração
      if (timeVisitanteId) {
        timeVisitante = await Time.findByPk(timeVisitanteId);
        if (!timeVisitante) {
          return res.status(400).json({ error: 'Time visitante não encontrado' });
        }
      }

      // Cria a partida com ou sem time visitante
      const partida = await Partida.create({
        data,
        hora,
        local,
        timeMandanteId,
        timeVisitanteId: timeVisitanteId || null, // Se timeVisitanteId não for fornecido, utiliza null
      });

      // Adiciona jogadores à partida (opcional)
      if (jogadoresIds && jogadoresIds.length > 0) {
        const jogadores = await Atleta.findAll({
          where: { id: jogadoresIds },
        });
        await partida.addJogadores(jogadores);
      }

      // Adiciona scouts e admins à partida (opcional)
      if (scoutsIds && scoutsIds.length > 0) {
        const scoutsAdmins = await Utilizadores.findAll({
          where: {
            id: scoutsIds,
            [Sequelize.Op.or]: [
              { role: 'Scout' },
              { role: 'Admin' },
            ],
          },
        });

        // Adiciona os scouts e admins à partida
        await partida.addScouts(scoutsAdmins);
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
          { model: Utilizadores, as: 'scouts' },
        ],
      });

      res.status(200).json(partidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as partidas' });
    }
  },
};
