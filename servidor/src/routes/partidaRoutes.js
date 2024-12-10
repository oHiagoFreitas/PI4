// src/routes/partidaRoutes.js

const express = require('express');
const router = express.Router();
const PartidaController = require('../controllers/partidaController');

// Rota para listar todas as partidas
router.get('/', PartidaController.listarPartidas);

// Rota para listar as partidas atribuídas ao usuário
router.get('/atribuidas/:userId', PartidaController.listarPartidasAtribuidas);

// Rota para criar uma partida
router.post('/', PartidaController.criarPartida);

router.delete('/:partidaId/scouts/:scoutId', PartidaController.removerScout);

// Rota para excluir uma partida
router.delete('/:partidaId', PartidaController.excluirPartida);

router.put('/:id/atribuir-scout', PartidaController.atribuirScout);

// Rota para editar uma partida
router.put('/:id', PartidaController.editarPartida);

router.get('/:id', PartidaController.obterPartidaPorId);

module.exports = router;
