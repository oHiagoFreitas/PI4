const Atleta = require('../models/Atleta');
const Relatorio = require('../models/Relatorio');
const Time = require('../models/Time');
const Utilizadores = require('../models/Utilizadores');

const listarPendentes = async (req, res) => {
    try {
        // Consultas para buscar registros pendentes em diferentes tabelas
        const atletasPendentes = await Atleta.findAll({ where: { status: 'pendente' } });
        const relatoriosPendentes = await Relatorio.findAll({ where: { status: 'pendente' } });
        const timesPendentes = await Time.findAll({ where: { status: 'pendente' } });
        const utilizadoresPendentes = await Utilizadores.findAll({ where: { status: 'pendente' } });

        // Retorna um objeto com os resultados
        res.status(200).json({
            atletas: atletasPendentes,
            relatorios: relatoriosPendentes,
            times: timesPendentes,
            utilizadores: utilizadoresPendentes,
        });
    } catch (error) {
        console.error('Erro ao listar itens pendentes:', error);
        res.status(500).json({ error: 'Erro ao listar itens pendentes.' });
    }
};

module.exports = { listarPendentes };
