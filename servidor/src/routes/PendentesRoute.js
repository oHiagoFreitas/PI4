const express = require('express');
const router = express.Router();
const pendentesController = require('../controllers/PendentesController');

// Rota para listar todos os pendentes
router.get('/pendentes', pendentesController.listarPendentes);

module.exports = router;