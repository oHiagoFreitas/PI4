const Atleta = require('../models/Atleta'); // ajuste o caminho conforme necessário
const Time = require('../models/Time'); // ajuste o caminho conforme necessário

// Criar um novo atleta
exports.createAtleta = async (req, res) => {
    const { nome, dataNascimento, nacionalidade, posicao, clube, link, agente, contactoAgente } = req.body;
    try {
        const time = await Time.findOne({ where: { nome: clube } });
        if (!time || time.status !== 'aprovado') {
            return res.status(400).json({ error: 'Time não encontrado ou não aprovado.' });
        }

        // Calcula o ano de nascimento a partir da dataNascimento
        const anoNascimento = new Date(dataNascimento).getFullYear();

        // Cria o atleta com o ano calculado
        const novoAtleta = await Atleta.create({ 
            nome, 
            dataNascimento, 
            ano: anoNascimento, // Salva automaticamente o ano
            nacionalidade, 
            posicao, 
            clube, 
            link, 
            agente, 
            contactoAgente, 
            timeId: time.id, 
            status: 'pendente' // Define o status inicial como 'pendente'
        });

        res.status(201).json(novoAtleta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar atleta' });
    }
};


exports.createAtletaAprovado = async (req, res) => {
    const { nome, dataNascimento, nacionalidade, posicao, clube, link, agente, contactoAgente } = req.body;
    try {
        const time = await Time.findOne({ where: { nome: clube } });
        if (!time || time.status !== 'aprovado') {
            return res.status(400).json({ error: 'Time não encontrado ou não aprovado.' });
        }

        // Calcula o ano de nascimento a partir da dataNascimento
        const anoNascimento = new Date(dataNascimento).getFullYear();

        // Cria o atleta com o ano calculado
        const novoAtleta = await Atleta.create({ 
            nome, 
            dataNascimento, 
            ano: anoNascimento, // Salva automaticamente o ano
            nacionalidade, 
            posicao, 
            clube, 
            link, 
            agente, 
            contactoAgente, 
            timeId: time.id, 
            status: 'aprovado' // Define o status inicial como 'pendente'
        });

        res.status(201).json(novoAtleta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar atleta' });
    }
};

// Função para atualizar o status do atleta
const updateAtletaStatus = async (req, res, status) => {
    const { id } = req.params;
    try {
        const atleta = await Atleta.findByPk(id);
        if (atleta) {
            atleta.status = status;
            await atleta.save();
            res.json({ message: `Status do atleta atualizado para ${status}.`, atleta });
        } else {
            res.status(404).json({ error: 'Atleta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status do atleta' });
    }
};

// Aprovar atleta
exports.aprovarAtleta = (req, res) => {
    updateAtletaStatus(req, res, 'aprovado');
};

// Rejeitar atleta
exports.rejeitarAtleta = (req, res) => {
    updateAtletaStatus(req, res, 'rejeitado');
};

// Colocar atleta como pendente
exports.pendenteAtleta = (req, res) => {
    updateAtletaStatus(req, res, 'pendente');
};

exports.desativarAtleta = (req, res) => {
    updateAtletaStatus(req, res, 'desativado');
};

// Mostrar todos os atletas
exports.getAllAtletas = async (req, res) => {
    try {
        const atletas = await Atleta.findAll({ include: [Time] });
        res.json(atletas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar atletas' });
    }
};

// Mostrar apenas os atletas aprovados
exports.getAllAtletasAprovados = async (req, res) => {
    try {
        // Consulta para buscar atletas com o status 'aprovado'
        const atletas = await Atleta.findAll({
            where: { status: 'aprovado' },  // Filtra apenas os atletas aprovados
            include: [Time] // Inclui os dados do time associado
        });
        res.json(atletas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar atletas' });
    }
};


// Mostrar um atleta pelo ID
exports.getAtletaById = async (req, res) => {
    const { id } = req.params;
    try {
        const atleta = await Atleta.findByPk(id, { include: [Time] });
        if (atleta) {
            res.json(atleta);
        } else {
            res.status(404).json({ error: 'Atleta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar atleta' });
    }
};


exports.updateAtleta = async (req, res) => {
    const { id } = req.params;
    const { 
        nome, 
        dataNascimento, 
        ano, 
        nacionalidade, 
        posicao, 
        clube, 
        link, 
        agente, 
        contactoAgente 
    } = req.body;

    try {
        // Encontrar o atleta pelo ID
        const atleta = await Atleta.findByPk(id);
        if (!atleta) {
            return res.status(404).json({ error: 'Atleta não encontrado' });
        }

        // Verificar se o clube (time) existe e está aprovado
        const time = await Time.findOne({ where: { nome: clube } });
        if (!time || time.status !== 'aprovado') {
            return res.status(400).json({ error: 'Time não encontrado ou não aprovado.' });
        }

        // Atualizar os dados do atleta
        atleta.nome = nome;
        atleta.dataNascimento = dataNascimento;
        atleta.ano = ano;
        atleta.nacionalidade = nacionalidade;
        atleta.posicao = posicao;
        atleta.clube = clube; // Atualiza o nome do clube
        atleta.link = link;
        atleta.agente = agente;
        atleta.contactoAgente = contactoAgente;
        atleta.timeId = time.id; // Atualiza o ID do time associado

        await atleta.save();
        res.json(atleta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar atleta' });
    }
};


// Deletar um atleta
exports.deleteAtleta = async (req, res) => {
    const { id } = req.params;
    try {
        const atleta = await Atleta.findByPk(id);
        if (atleta) {
            await atleta.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Atleta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar atleta' });
    }
};

exports.getTotalAtletas = async (req, res) => {
    try {
        // Conta o número total de atletas
        const totalAtletas = await Atleta.count();
        res.json({ totalAtletas });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao contar o total de atletas' });
    }
};