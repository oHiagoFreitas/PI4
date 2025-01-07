const Notificacoes = require('../models/Notificacao');
const Utilizadores = require('../models/Utilizadores');

// Criar uma nova notificação
// Criar uma nova notificação
exports.createNotificacao = async (req, res) => {
    const { conteudo, tipo, destinatarioId, remetenteId } = req.body;

    try {
        // Verificar se o destinatário existe
        const destinatario = await Utilizadores.findByPk(destinatarioId);
        if (!destinatario) {
            return res.status(404).json({ error: 'Destinatário não encontrado' });
        }

        // Verificar se o remetente existe
        const remetente = await Utilizadores.findByPk(remetenteId);
        if (!remetente) {
            return res.status(404).json({ error: 'Remetente não encontrado' });
        }

        // Verifica se o tipo é válido
        const tiposValidos = ['Criação', 'Atribuição', 'Atualização'];  // Exemplo de tipos válidos
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({ error: 'Tipo de notificação inválido' });
        }

        // Criar a nova notificação
        const novaNotificacao = await Notificacoes.create({
            mensagem: conteudo,  // Alterado de "conteudo" para "mensagem" para refletir o nome da coluna
            tipo,
            destinatarioId,
            remetenteId,
        });

        res.status(201).json(novaNotificacao);

    } catch (error) {
        console.error(error);  // Logando o erro para entender melhor o que aconteceu
        res.status(500).json({ error: 'Erro ao criar notificação', details: error.message });
    }
};


// Mostrar todas as notificações
exports.getAllNotificacoes = async (req, res) => {
    try {
        const notificacoes = await Notificacoes.findAll({
            include: [
                { model: Utilizadores, as: 'destinatario', attributes: ['id', 'nome', 'email'] },
                { model: Utilizadores, as: 'remetente', attributes: ['id', 'nome', 'email'] },
            ],
        });
        res.json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificações' });
    }
};

exports.getAllNotificacoesCriaçao = async (req, res) => {
    try {
        const notificacoes = await Notificacoes.findAll({
            where: {
                tipo: 'Criação'  // Filtra notificações do tipo "Criação"
            },
            include: [
                { model: Utilizadores, as: 'destinatario', attributes: ['id', 'nome', 'email'] },
                { model: Utilizadores, as: 'remetente', attributes: ['id', 'nome', 'email'] },
            ],
        });
        res.json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificações' });
    }
};

// Mostrar notificações por ID
exports.getNotificacaoById = async (req, res) => {
    const { id } = req.params;

    try {
        const notificacao = await Notificacoes.findByPk(id, {
            include: [
                { model: Utilizadores, as: 'destinatario', attributes: ['id', 'nome', 'email'] },
                { model: Utilizadores, as: 'remetente', attributes: ['id', 'nome', 'email'] },
            ],
        });

        if (notificacao) {
            res.json(notificacao);
        } else {
            res.status(404).json({ error: 'Notificação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificação' });
    }
};

// Mostrar notificações de um determinado utilizador
exports.getNotificacoesByUtilizador = async (req, res) => {
    const { utilizadorId } = req.params;

    try {
        const notificacoes = await Notificacoes.findAll({
            where: { destinatarioId: utilizadorId },
            order: [['createdAt', 'DESC']],
        });

        if (notificacoes.length > 0) {
            res.json(notificacoes);
        } else {
            res.status(404).json({ message: 'Nenhuma notificação encontrada para este utilizador' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificações' });
    }
};

// Marcar uma notificação como lida
exports.markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notificacao = await Notificacoes.findByPk(id);
        if (notificacao) {
            notificacao.lida = true;
            await notificacao.save();
            res.json(notificacao);
        } else {
            res.status(404).json({ error: 'Notificação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar notificação' });
    }
};

// Apagar uma notificação
exports.deleteNotificacao = async (req, res) => {
    const { id } = req.params;

    try {
        const notificacao = await Notificacoes.findByPk(id);
        if (notificacao) {
            await notificacao.destroy();
            res.status(204).send(); // Status 204 No Content
        } else {
            res.status(404).json({ error: 'Notificação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar notificação' });
    }
};

// Obter notificações não lidas de um utilizador
exports.getUnreadNotificacoes = async (req, res) => {
    const { utilizadorId } = req.params;

    try {
        const notificacoesNaoLidas = await Notificacoes.findAll({
            where: { destinatarioId: utilizadorId, lida: false },
            order: [['createdAt', 'DESC']],
        });

        if (notificacoesNaoLidas.length > 0) {
            res.json(notificacoesNaoLidas);
        } else {
            res.status(404).json({ message: 'Nenhuma notificação não lida encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notificações não lidas' });
    }
};
