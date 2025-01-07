const express = require('express');
const router = express.Router();
const NotificacoesController = require('../controllers/NotificacaoController');

// Criar uma nova notificação (para um ou todos os admins)
router.post('/', NotificacoesController.createNotificacao);

// Mostrar todas as notificações
router.get('/', NotificacoesController.getAllNotificacoes); 

router.get('/Criacao', NotificacoesController.getAllNotificacoesCriaçao); 
// Mostrar uma notificação por ID
router.get('/:id', NotificacoesController.getNotificacaoById);

// Mostrar notificações de um utilizador específico
router.get('/utilizador/:utilizadorId', NotificacoesController.getNotificacoesByUtilizador);

// Marcar uma notificação como lida
router.put('/mark-as-read/:id', NotificacoesController.markAsRead);

// Apagar uma notificação
router.delete('/:id', NotificacoesController.deleteNotificacao);

// Obter notificações não lidas de um utilizador
router.get('/unread/:utilizadorId', NotificacoesController.getUnreadNotificacoes);

module.exports = router;
