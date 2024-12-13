const express = require('express');
const router = express.Router();
const equipePrincipalController = require('../controllers/EquipePrincipalController');

// Rota para criar uma nova equipe principal
router.post('/', equipePrincipalController.createEquipePrincipal);

// Rota para obter todas as equipes principais
router.get('/', equipePrincipalController.getAllEquipesPrincipais);

// Rota para adicionar jogadores a uma equipe principal
router.post('/jogadores', equipePrincipalController.addJogadoresToEquipePrincipal);

// Rota para remover jogadores de uma equipe principal
router.post('/remover-jogadores', equipePrincipalController.removeJogadoresFromEquipePrincipal);

// Rota para atualizar uma equipe principal
router.put('/:id', equipePrincipalController.updateEquipePrincipal);

// Rota para buscar uma equipe principal pelo ID
router.get('/:id', equipePrincipalController.getEquipePrincipalById);

// Rota para buscar atletas de uma equipe principal específica
router.get('/:id/atletas', equipePrincipalController.getAtletasByEquipePrincipal);

// Rota para atualizar apenas o nome e atributos principais de uma equipe principal
router.put('/:id/nome', equipePrincipalController.updateEquipePrincipalNome);

module.exports = router;
