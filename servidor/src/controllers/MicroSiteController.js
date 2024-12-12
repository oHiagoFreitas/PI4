const Microsite = require('../models/MicroSite'); // Ajuste o caminho conforme necessário

// Função para criar um novo microsite
exports.createMicrosite = async (req, res) => {
    try {
        const { titulo, mensagem } = req.body;

        // Cria um novo microsite
        const newMicrosite = await Microsite.create({ titulo, mensagem });

        res.status(201).json(newMicrosite);
    } catch (error) {
        console.error('Erro ao criar microsite:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para editar um microsite existente
exports.updateMicrosite = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, mensagem } = req.body;

        // Encontra o microsite por ID e atualiza
        const microsite = await Microsite.findByPk(id);

        if (!microsite) {
            return res.status(404).json({ error: 'Microsite não encontrado' });
        }

        microsite.titulo = titulo;
        microsite.mensagem = mensagem;

        await microsite.save();

        res.json(microsite);
    } catch (error) {
        console.error('Erro ao editar microsite:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para mostrar detalhes de um microsite por ID
exports.getMicrosite = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o microsite pelo seu ID
        const microsite = await Microsite.findByPk(id);

        if (!microsite) {
            return res.status(404).json({ error: 'Microsite não encontrado' });
        }

        res.json(microsite);
    } catch (error) {
        console.error('Erro ao buscar microsite:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
