const Relatorio = require('../models/Relatorio');
const Atleta = require('../models/Atleta');

// Criar um novo relatório
exports.createRelatorio = async (req, res) => {
    const { tecnica, velocidade, atitudeCompetitiva, inteligencia, altura, morfologia, ratingFinal, comentario, atletaNome, status } = req.body;

    try {
        // Busca o atleta pelo nome
        const atleta = await Atleta.findOne({ where: { nome: atletaNome } });
        if (!atleta) {
            return res.status(404).json({ error: 'Atleta não encontrado.' });
        }

        // Cria o relatório usando o ID do atleta encontrado
        const novoRelatorio = await Relatorio.create({ 
            tecnica, 
            velocidade, 
            atitudeCompetitiva, 
            inteligencia, 
            altura, 
            morfologia, 
            ratingFinal, 
            comentario, 
            atletaId: atleta.id, // Usando o ID do atleta
            status: status || 'Pendente' // Define o status ou usa 'Pendente' como padrão
        });

        res.status(201).json(novoRelatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar relatório.' });
    }
};

// Listar todos os relatórios
exports.getAllRelatorios = async (req, res) => {
    try {
        const relatorios = await Relatorio.findAll({
            include: [
                { model: Atleta, as: 'atleta' },
            ],
        });
        res.json(relatorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar relatórios.' });
    }
};

// Obter um relatório por ID
exports.getRelatorioById = async (req, res) => {
    const { id } = req.params;

    try {
        const relatorio = await Relatorio.findByPk(id, {
            include: [
                { model: Atleta, as: 'atleta' },
            ],
        });

        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        res.json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar relatório.' });
    }
};

// Atualizar um relatório
exports.updateRelatorio = async (req, res) => {
    const { id } = req.params;
    const { tecnica, velocidade, atitudeCompetitiva, inteligencia, altura, morfologia, ratingFinal, comentario, status } = req.body;

    try {
        const relatorio = await Relatorio.findByPk(id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        // Atualiza o relatório com os novos dados
        await relatorio.update({ 
            tecnica, 
            velocidade, 
            atitudeCompetitiva, 
            inteligencia, 
            altura, 
            morfologia, 
            ratingFinal, 
            comentario, 
            status // Permite atualizar o status também
        });
        res.json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar relatório.' });
    }
};

// Deletar um relatório
exports.deleteRelatorio = async (req, res) => {
    const { id } = req.params;

    try {
        const relatorio = await Relatorio.findByPk(id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        await relatorio.destroy();
        res.status(204).send(); // Retorna 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar relatório.' });
    }
};

// Listar relatórios pendentes
exports.getRelatoriosPendentes = async (req, res) => {
    try {
        const relatoriosPendentes = await Relatorio.findAll({
            where: { status: 'Pendente' }, // Filtra relatórios com status 'Pendente'
            include: [
                { model: Atleta, as: 'atleta' },
            ],
        });
        res.json(relatoriosPendentes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar relatórios pendentes.' });
    }
};
