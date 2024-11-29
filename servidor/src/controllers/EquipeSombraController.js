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

exports.addJogadoresToEquipeSombra = async (req, res) => {
    const { equipeSombraId, jogadoresIds, positions } = req.body;

    try {
        const equipeSombra = await EquipeSombra.findByPk(equipeSombraId);

        if (!equipeSombra) {
            return res.status(404).json({ error: 'Equipe Sombra não encontrada' });
        }

        // Busca os jogadores pelo ID
        const jogadores = await Atleta.findAll({ where: { id: jogadoresIds } });

        if (jogadores.length !== jogadoresIds.length) {
            return res.status(404).json({ error: 'Alguns jogadores não foram encontrados' });
        }

        // Adicionar jogadores às posições corretas
        for (let jogador of jogadores) {
            const posicao = positions[jogador.id]; // Pega a posição do jogador

            if (!posicao) {
                return res.status(400).json({ error: `Posição não encontrada para o jogador ${jogador.id}` });
            }

            // Salva a relação com a posição do jogador
            await equipeSombra.addAtletas(jogador, {
                through: {
                    posicaoId: posicao  // Agora apenas armazena o ID da posição
                }
            });
        }

        res.status(200).json({ message: 'Jogadores adicionados com sucesso!' });
    } catch (error) {
        console.error("Erro ao adicionar jogadores:", error);  // Log completo
        res.status(500).json({ error: 'Erro ao adicionar jogadores à equipe sombra', details: error.message });

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


exports.getAtletasByEquipeSombra = async (req, res) => {
    const { id } = req.params;

    try {
        const equipeSombra = await EquipeSombra.findByPk(id, {
            include: {
                model: Atleta,
                as: 'atletas',
                attributes: ['id', 'nome'],
                through: { attributes: ['posicaoId'] },  // Inclui a posição do jogador na resposta
            },
        });

        if (!equipeSombra) {
            return res.status(404).json({ error: 'Equipe Sombra não encontrada' });
        }

        // Retorna os jogadores com suas posições
        res.status(200).json(equipeSombra.atletas.map(jogador => ({
            id: jogador.id,
            nome: jogador.nome,
            posicao: jogador.EquipeSombraAtletas.posicaoId,  // A posição do jogador
        })));
    } catch (error) {
        console.error("Erro ao buscar atletas da equipe sombra:", error);
        res.status(500).json({ error: 'Erro ao buscar atletas da equipe sombra' });
    }
};

exports.updateEquipeSombra = async (req, res) => {
    const { id } = req.params;
    const { jogadoresIds, positions } = req.body; // Agora espera os jogadores e suas novas posições

    try {
        // Verificar se a equipe sombra existe
        const equipeSombra = await EquipeSombra.findByPk(id, {
            include: {
                model: Atleta,
                as: 'atletas',
                attributes: ['id'],
                through: { attributes: ['posicaoId'] }  // Incluindo a posição dos jogadores
            }
        });

        if (!equipeSombra) {
            return res.status(404).json({ error: 'Equipe Sombra não encontrada' });
        }

        // Verificar se os jogadores existem
        const jogadores = await Atleta.findAll({ where: { id: jogadoresIds } });

        if (jogadores.length !== jogadoresIds.length) {
            return res.status(404).json({ error: 'Alguns jogadores não foram encontrados' });
        }

        // Adicionar ou atualizar jogadores
        for (let jogador of jogadores) {
            const posicao = positions[jogador.id]; // Pega a posição do jogador

            if (!posicao) {
                return res.status(400).json({ error: `Posição não encontrada para o jogador ${jogador.id}` });
            }

            // Verificar se o jogador já está na equipe
            const jogadorExistente = equipeSombra.atletas.find(atleta => atleta.id === jogador.id);

            if (jogadorExistente) {
                // Atualizar a posição do jogador existente
                await equipeSombra.removeAtletas(jogador);
                await equipeSombra.addAtletas(jogador, {
                    through: {
                        posicaoId: posicao // Atualiza a posição do jogador
                    }
                });
            } else {
                // Adicionar o jogador à equipe
                await equipeSombra.addAtletas(jogador, {
                    through: {
                        posicaoId: posicao // Define a posição ao adicionar
                    }
                });
            }
        }

        // Se tudo correr bem, retorna uma resposta de sucesso
        res.status(200).json({ message: 'Jogadores atualizados com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar jogadores na equipe sombra:", error);
        res.status(500).json({ error: 'Erro ao atualizar jogadores na equipe sombra' });
    }
};