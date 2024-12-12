const express = require('express');
const router = express.Router();
const micrositeController = require('../controllers/MicroSiteController');

// Rota para criar um novo microsite
router.post('/', micrositeController.createMicrosite);

// Rota para editar um microsite existente
router.put('/:id', micrositeController.updateMicrosite);

// Rota para mostrar detalhes de um microsite por ID
router.get('/:id', micrositeController.getMicrosite);

module.exports = router;
