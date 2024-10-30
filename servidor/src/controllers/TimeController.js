const Time = require('../models/Time'); // ajuste o caminho conforme necessário

// Criar um novo time
exports.createTime = async (req, res) => {
    const { nome, pais, categoria, descricao } = req.body;
    try {
        // Verifica se já existe um time com o mesmo nome
        const timeExistente = await Time.findOne({ where: { nome } });
        if (timeExistente) {
            return res.status(400).json({ error: 'Já existe um time com esse nome.' });
        }

        // Cria o novo time se o nome for único
        const novoTime = await Time.create({ nome, pais, categoria, descricao });
        res.status(201).json(novoTime);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar time' });
    }
};

// Mostrar todos os times
exports.getAllTimes = async (req, res) => {
    try {
        const times = await Time.findAll();
        res.json(times);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar times' });
    }
};

// Mostrar um time pelo ID
exports.getTimeById = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            res.json(time);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar time' });
    }
};

// Editar um time
exports.updateTime = async (req, res) => {
    const { id } = req.params;
    const { nome, pais, categoria, descricao, status } = req.body;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.nome = nome;
            time.pais = pais;
            time.categoria = categoria;
            time.descricao = descricao;
            time.status = status;
            await time.save();
            res.json(time);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar time' });
    }
};

// Deletar um time
exports.deleteTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            await time.destroy();
            res.status(204).send(); // Status 204 No Content
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar time' });
    }
};

// Aprovar um time (opcional)
exports.approveTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'aprovado'; // Atualiza o status para "aprovado"
            await time.save();
            res.json(time);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao aprovar time' });
    }
};

// Rejeitar um time (opcional)
exports.rejectTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'rejeitado'; // Atualiza o status para "rejeitado"
            await time.save();
            res.json(time);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao rejeitar time' });
    }
};

// Desativar um time (opcional)
exports.deactivateTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'desativado'; // Atualiza o status para "desativado"
            await time.save();
            res.json(time);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao desativar time' });
    }
};
