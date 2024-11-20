const express = require('express');
const router = express.Router();
const partidaController = require('../controllers/partidaController');

// Rota para criar uma partida
router.post('/', partidaController.criarPartida);

// Rota para listar todas as partidas
router.get('/', partidaController.listarPartidas);

module.exports = router;
