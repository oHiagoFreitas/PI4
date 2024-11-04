// src/routes/relatorioRoutes.js
const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/RelatorioController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware

// Criar um novo relatório
router.post('/', authMiddleware.checkToken, relatorioController.createRelatorio);

// Listar todos os relatórios
router.get('/', relatorioController.getAllRelatorios);

router.get('/pendentes', relatorioController.getRelatoriosPendentes);

// Obter um relatório por ID
router.get('/:id', relatorioController.getRelatorioById);

// Atualizar um relatório
router.put('/:id', relatorioController.updateRelatorio);

// Deletar um relatório
router.delete('/:id', relatorioController.deleteRelatorio);

module.exports = router;
