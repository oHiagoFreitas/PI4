const Time = require('../models/Time'); // Ajuste conforme o caminho do modelo
const Jogador = require('../models/Atleta'); // Ajuste conforme o seu modelo de Jogador

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
        res.status(201).json({
            message: 'Time criado com sucesso!',
            data: novoTime
        });
    } catch (error) {
        res.status(500).json({ error: `Erro ao criar time: ${error.message}` });
    }
};

// Mostrar todos os times
exports.getAllTimes = async (req, res) => {
    try {
        const times = await Time.findAll();
        res.status(200).json(times);
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar times: ${error.message}` });
    }
};

exports.getTimeById = async (req, res) => {
    const { id } = req.params; // Pega o ID do time da URL
    try {
        // Busca o time pelo ID
        const time = await Time.findByPk(id);

        if (time) {
            res.status(200).json(time); // Retorna o time em formato JSON
        } else {
            res.status(404).json({ error: 'Time não encontrado' }); // Caso o time não exista
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar time: ${error.message}` }); // Erro no servidor
    }
};

exports.updateTime = async (req, res) => {
    const { id } = req.params;
    const { nome, pais, categoria, descricao } = req.body;
    
    try {
        // Verifica se o time existe
        const time = await Time.findByPk(id);
        if (time) {
            // Atualiza os dados do time
            time.nome = nome;
            time.pais = pais;
            time.categoria = categoria;
            time.descricao = descricao;
            
            // Atualiza os atletas associados ao time
            const atletas = await Jogador.findAll({ where: { timeId: time.id } });
            for (const atleta of atletas) {
                atleta.clube = nome; // Atualiza o nome do time no atleta
                await atleta.save(); // Salva a mudança
            }

            // Salva as mudanças no time
            await time.save();
            res.status(200).json({
                message: 'Time e atletas atualizados com sucesso!',
                data: time
            });
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao atualizar time: ${error.message}` });
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
        res.status(500).json({ error: `Erro ao apagar time: ${error.message}` });
    }
};

// Aprovar um time
exports.approveTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'aprovado'; // Atualiza o status para "aprovado"
            await time.save();
            res.status(200).json({
                message: 'Time aprovado com sucesso!',
                data: time
            });
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao aprovar time: ${error.message}` });
    }
};

// Rejeitar um time
exports.rejectTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'rejeitado'; // Atualiza o status para "rejeitado"
            await time.save();
            res.status(200).json({
                message: 'Time rejeitado com sucesso!',
                data: time
            });
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao rejeitar time: ${error.message}` });
    }
};

// Desativar um time
exports.deactivateTime = async (req, res) => {
    const { id } = req.params;
    try {
        const time = await Time.findByPk(id);
        if (time) {
            time.status = 'desativado'; // Atualiza o status para "desativado"
            await time.save();
            res.status(200).json({
                message: 'Time desativado com sucesso!',
                data: time
            });
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao desativar time: ${error.message}` });
    }
};

// Recuperar jogadores de um time
exports.getJogadoresByTimeId = async (req, res) => {
    const { timeId } = req.params;
    try {
        const jogadores = await Jogador.findAll({ where: { timeId } });
        if (jogadores.length > 0) {
            res.status(200).json(jogadores);
        } else {
            res.status(404).json({ error: 'Nenhum jogador encontrado para esse time' });
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar jogadores: ${error.message}` });
    }
};


