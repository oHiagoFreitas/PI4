// src/controllers/EquipeSombraController.js
const EquipeSombra = require('../models/EquipeSombra');
const Formacao = require('../models/Formacao');
const Atleta = require('../models/Atleta'); // Importando o modelo de Atleta

// Criar uma nova equipe sombra
exports.createEquipeSombra = async (req, res) => {
    const { nome, descricao, categoria, formacaoNome } = req.body;
    try {
        // Buscar a formação pelo nome
        const formacao = await Formacao.findOne({ where: { nome: formacaoNome } });
        
        if (!formacao) {
            return res.status(404).json({ error: 'Formação não encontrada' });
        }

        // Criar a nova equipe sombra
        const novaEquipe = await EquipeSombra.create({
            nome,
            descricao,
            categoria,
            formacaoId: formacao.id // Usa o ID da formação encontrada
        });
        
        res.status(201).json(novaEquipe);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar equipe sombra' });
    }
};

exports.getAllEquipesSombra = async (req, res) => {
    try {
        const equipesSombra = await EquipeSombra.findAll({ 
            include: Formacao 
        });
        
        if (!equipesSombra || equipesSombra.length === 0) {
            return res.status(404).json({ error: 'Nenhuma equipe sombra encontrada' });
        }

        res.json(equipesSombra);
    } catch (error) {
        console.error("Erro ao buscar equipes sombra:", error); // Exibindo erro no console
        res.status(500).json({ error: `Erro ao buscar equipes sombra: ${error.message}` });
    }
};

// Adicionar jogadores a uma equipe sombra
exports.addJogadoresToEquipeSombra = async (req, res) => {
    const { equipeSombraId, jogadoresIds } = req.body; // Esperamos um array de IDs de jogadores

    try {
        const equipeSombra = await EquipeSombra.findByPk(equipeSombraId);
        
        if (!equipeSombra) {
            return res.status(404).json({ error: 'Equipe Sombra não encontrada' });
        }

        // Verifica se os jogadores existem
        const jogadores = await Atleta.findAll({ where: { id: jogadoresIds } });
        
        if (jogadores.length !== jogadoresIds.length) {
            return res.status(404).json({ error: 'Alguns jogadores não foram encontrados' });
        }

        // Adiciona os jogadores à equipe sombra
        await equipeSombra.addAtletas(jogadores);

        res.status(200).json({ message: 'Jogadores adicionados com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar jogadores à equipe sombra' });
    }
};

// Remover jogadores de uma equipe sombra
exports.removeJogadoresFromEquipeSombra = async (req, res) => {
    const { equipeSombraId, jogadoresIds } = req.body;

    try {
        const equipeSombra = await EquipeSombra.findByPk(equipeSombraId);

        if (!equipeSombra) {
            return res.status(404).json({ error: 'Equipe Sombra não encontrada' });
        }

        // Verifica se os jogadores existem
        const jogadores = await Atleta.findAll({ where: { id: jogadoresIds } });

        if (jogadores.length !== jogadoresIds.length) {
            return res.status(404).json({ error: 'Alguns jogadores não foram encontrados' });
        }

        // Remove os jogadores da equipe sombra
        await equipeSombra.removeAtletas(jogadores);

        res.status(200).json({ message: 'Jogadores removidos com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover jogadores da equipe sombra' });
    }
};
