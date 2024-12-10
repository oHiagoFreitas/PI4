// src/controllers/PartidaController.js

const Sequelize = require('sequelize');
const Partida = require('../models/Partida');
const Atleta = require('../models/Atleta');
const Time = require('../models/Time');
const Utilizadores = require('../models/Utilizadores');

module.exports = {
  // Método para criar uma partida
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

  // Método para listar todas as partidas
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

  // Método para listar as partidas atribuídas ao usuário logado
  async listarPartidasAtribuidas(req, res) {
    const { userId } = req.params; // Recebe o ID do usuário logado como parâmetro

    try {
      // Busca as partidas em que o usuário logado está como scout
      const partidas = await Partida.findAll({
        include: [
          { model: Time, as: 'timeMandante' },
          { model: Time, as: 'timeVisitante' },
          { model: Atleta, as: 'jogadores' },
          { model: Utilizadores, as: 'scouts', where: { id: userId } }, // Filtra pela id do usuário
        ],
      });

      if (partidas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma partida atribuída para o usuário.' });
      }

      res.status(200).json(partidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as partidas atribuídas' });
    }
  },

  // Método para excluir uma partida
  async excluirPartida(req, res) {
    const { partidaId } = req.params; // ID da partida a ser excluída

    try {
      const partida = await Partida.findByPk(partidaId);
      if (!partida) {
        return res.status(404).json({ error: 'Partida não encontrada' });
      }

      // Exclui a partida
      await partida.destroy();

      res.status(200).json({ message: 'Partida excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir a partida' });
    }
  },

  // Método para editar uma partida
  async editarPartida(req, res) {
    const { id } = req.params; // ID da partida a ser editada
    const { data, hora, local, timeMandanteId, timeVisitanteId, jogadoresIds, scoutsIds } = req.body;

    try {
      const partida = await Partida.findByPk(id);
      if (!partida) {
        return res.status(404).json({ error: 'Partida não encontrada' });
      }

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

      // Atualiza os campos principais da partida
      partida.data = data || partida.data;
      partida.hora = hora || partida.hora;
      partida.local = local || partida.local;
      partida.timeMandanteId = timeMandanteId || partida.timeMandanteId;
      partida.timeVisitanteId = timeVisitanteId || partida.timeVisitanteId;

      // Atualiza jogadores da partida
      if (jogadoresIds && jogadoresIds.length > 0) {
        const jogadores = await Atleta.findAll({
          where: { id: jogadoresIds },
        });
        await partida.setJogadores(jogadores); // Substitui jogadores existentes
      }

      // Atualiza scouts e admins da partida
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
        await partida.setScouts(scoutsAdmins); // Substitui scouts/admins existentes
      }

      await partida.save();

      res.status(200).json(partida);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao editar a partida' });
    }
  },

  async obterPartidaPorId(req, res) {
    const { id } = req.params; // ID da partida a ser recuperada

    try {
      const partida = await Partida.findByPk(id, {
        include: [
          { model: Time, as: 'timeMandante', attributes: ['id', 'nome'] },
          { model: Time, as: 'timeVisitante', attributes: ['id', 'nome'] },
          { model: Atleta, as: 'jogadores', attributes: ['id', 'nome', 'posicao'] },
          { model: Utilizadores, as: 'scouts', attributes: ['id', 'nome', 'role'] },
        ],
      });

      if (!partida) {
        return res.status(404).json({ error: 'Partida não encontrada' });
      }

      res.status(200).json(partida);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter a partida' });
    }
  },

  async atribuirScout(req, res) {
    const { id } = req.params;
    const { scoutsIds } = req.body;

    try {
        // Verifica se a partida existe
        const partida = await Partida.findByPk(id);
        if (!partida) {
            return res.status(404).json({ error: 'Partida não encontrada' });
        }

        // Verifica se o(s) scout(s) existe(m) e tem(têm) o papel de 'Scout' ou 'Admin'
        const scouts = await Utilizadores.findAll({
            where: {
                id: scoutsIds,
                [Sequelize.Op.or]: [{ role: 'Scout' }, { role: 'Admin' }]
            }
        });

        if (scouts.length === 0) {
            return res.status(404).json({ error: 'Scout(s) não encontrado(s) ou não autorizado(s)' });
        }

        // Adiciona os scouts à partida
        await partida.addScouts(scouts);

        res.status(200).json({ message: 'Scout(s) atribuído(s) com sucesso', partida });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atribuir scout à partida' });
    }
},

// Método para remover um scout de uma partida
async removerScout(req, res) {
  const { partidaId, scoutId } = req.params; // ID da partida e ID do scout a ser removido

  try {
    // Verifica se a partida existe
    const partida = await Partida.findByPk(partidaId);
    if (!partida) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    // Verifica se o scout existe e está atribuído à partida
    const scout = await Utilizadores.findByPk(scoutId);
    if (!scout) {
      return res.status(404).json({ error: 'Scout não encontrado' });
    }

    // Verifica se o scout está associado à partida
    const isScoutAssigned = await partida.hasScout(scout);
    if (!isScoutAssigned) {
      return res.status(404).json({ error: 'Scout não está associado a essa partida' });
    }

    // Remove o scout da partida
    await partida.removeScout(scout);

    res.status(200).json({ message: 'Scout removido da partida com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover scout da partida' });
  }
}




};
