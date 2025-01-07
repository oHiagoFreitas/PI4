// src/routes/relatorioRoutes.js
const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/RelatorioController');


// Criar um novo relatório
router.post('/', relatorioController.createRelatorio);

// Listar todos os relatórios
router.get('/', relatorioController.getAllRelatorios);

router.get('/pendentes', relatorioController.getRelatoriosPendentes);

router.get('/total-relatorios', relatorioController.getTotalRelatorios);

// Rota para retornar o total de relatórios com rating 5
router.get('/total-relatorios-rating5', relatorioController.getTotalRelatoriosRating5);

router.get('/atleta/:atletaId', relatorioController.getRelatoriosByAtletaId);

// Obter um relatório por ID
router.get('/:id', relatorioController.getRelatorioById);

// Atualizar um relatório
router.put('/:id', relatorioController.updateRelatorio);

// Deletar um relatório
router.delete('/:id', relatorioController.deleteRelatorio);

router.put('/:id/aprovar', relatorioController.aprovarRelatorio);

// Rota para rejeitar relatório
router.put('/:id/rejeitar', relatorioController.rejeitarRelatorio);

module.exports = router;
