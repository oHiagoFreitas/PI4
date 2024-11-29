const express = require('express');
const router = express.Router();
const equipeSombraController = require('../controllers/EquipeSombraController');

// Rota para criar uma nova equipe sombra
router.post('/', equipeSombraController.createEquipeSombra);

// Rota para obter todas as equipes sombra
router.get('/', equipeSombraController.getAllEquipesSombra);

// Rota para adicionar jogadores a uma equipe sombra
router.post('/jogadores', equipeSombraController.addJogadoresToEquipeSombra);

// Rota para remover jogadores de uma equipe sombra
router.post('/remover-jogadores', equipeSombraController.removeJogadoresFromEquipeSombra);

router.put('/:id', equipeSombraController.updateEquipeSombra);

// Buscar atletas de uma equipe sombra específica
router.get('/:id/atletas', equipeSombraController.getAtletasByEquipeSombra);




module.exports = router;
