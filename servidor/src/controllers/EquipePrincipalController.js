// src/controllers/EquipePrincipalController.js
const EquipePrincipal = require('../models/equipePrincipal');
const Formacao = require('../models/Formacao');
const Atleta = require('../models/Atleta'); // Importando o modelo de Atleta

// Criar uma nova equipe principal
exports.createEquipePrincipal = async (req, res) => {
    const { nome, descricao, categoria, formacaoNome } = req.body;
    try {
        // Buscar a formação pelo nome
        const formacao = await Formacao.findOne({ where: { nome: formacaoNome } });

        if (!formacao) {
            return res.status(404).json({ error: 'Formação não encontrada' });
        }

        // Criar a nova equipe principal
        const novaEquipe = await EquipePrincipal.create({
            nome,
            descricao,
            categoria,
            formacaoId: formacao.id // Usa o ID da formação encontrada
        });

        res.status(201).json(novaEquipe);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar equipe principal' });
    }
};

exports.getAllEquipesPrincipais = async (req, res) => {
    try {
        const equipesPrincipais = await EquipePrincipal.findAll({
            include: Formacao
        });

        if (!equipesPrincipais || equipesPrincipais.length === 0) {
            return res.status(404).json({ error: 'Nenhuma equipe principal encontrada' });
        }

        res.json(equipesPrincipais);
    } catch (error) {
        console.error("Erro ao buscar equipes principais:", error); // Exibindo erro no console
        res.status(500).json({ error: `Erro ao buscar equipes principais: ${error.message}` });
    }
};

exports.addJogadoresToEquipePrincipal = async (req, res) => {
    const { equipePrincipalId, jogadoresIds, positions } = req.body;

    try {
        const equipePrincipal = await EquipePrincipal.findByPk(equipePrincipalId);

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
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
            await equipePrincipal.addAtletas(jogador, {
                through: {
                    posicaoId: posicao  // Agora apenas armazena o ID da posição
                }
            });
        }

        res.status(200).json({ message: 'Jogadores adicionados com sucesso!' });
    } catch (error) {
        console.error("Erro ao adicionar jogadores:", error);  // Log completo
        res.status(500).json({ error: 'Erro ao adicionar jogadores à equipe principal', details: error.message });

    }
};


// Remover jogadores de uma equipe principal
exports.removeJogadoresFromEquipePrincipal = async (req, res) => {
    const { equipePrincipalId, jogadoresIds } = req.body;

    try {
        const equipePrincipal = await EquipePrincipal.findByPk(equipePrincipalId);

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
        }

        // Verifica se os jogadores existem
        const jogadores = await Atleta.findAll({ where: { id: jogadoresIds } });

        if (jogadores.length !== jogadoresIds.length) {
            return res.status(404).json({ error: 'Alguns jogadores não foram encontrados' });
        }

        // Remove os jogadores da equipe principal
        await equipePrincipal.removeAtletas(jogadores);

        res.status(200).json({ message: 'Jogadores removidos com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover jogadores da equipe principal' });
    }
};


exports.getAtletasByEquipePrincipal = async (req, res) => {
    const { id } = req.params;

    try {
        const equipePrincipal = await EquipePrincipal.findByPk(id, {
            include: {
                model: Atleta,
                as: 'atletas',
                attributes: ['id', 'nome'],
                through: { attributes: ['posicaoId'] },  // Inclui a posição do jogador na resposta
            },
        });

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
        }

        // Retorna os jogadores com suas posições
        res.status(200).json(equipePrincipal.atletas.map(jogador => ({
            id: jogador.id,
            nome: jogador.nome,
            posicao: jogador.EquipePrincipalAtletas.posicaoId,  // A posição do jogador
        })));
    } catch (error) {
        console.error("Erro ao buscar atletas da equipe principal:", error);
        res.status(500).json({ error: 'Erro ao buscar atletas da equipe principal' });
    }
};

exports.updateEquipePrincipal = async (req, res) => {
    const { id } = req.params;
    const { jogadoresIds, positions } = req.body; // Agora espera os jogadores e suas novas posições

    try {
        // Verificar se a equipe principal existe
        const equipePrincipal = await EquipePrincipal.findByPk(id, {
            include: {
                model: Atleta,
                as: 'atletas',
                attributes: ['id'],
                through: { attributes: ['posicaoId'] }  // Incluindo a posição dos jogadores
            }
        });

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
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
            const jogadorExistente = equipePrincipal.atletas.find(atleta => atleta.id === jogador.id);

            if (jogadorExistente) {
                // Atualizar a posição do jogador existente
                await equipePrincipal.removeAtletas(jogador);
                await equipePrincipal.addAtletas(jogador, {
                    through: {
                        posicaoId: posicao // Atualiza a posição do jogador
                    }
                });
            } else {
                // Adicionar o jogador à equipe
                await equipePrincipal.addAtletas(jogador, {
                    through: {
                        posicaoId: posicao // Define a posição ao adicionar
                    }
                });
            }
        }

        // Se tudo correr bem, retorna uma resposta de sucesso
        res.status(200).json({ message: 'Jogadores atualizados com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar jogadores na equipe principal:", error);
        res.status(500).json({ error: 'Erro ao atualizar jogadores na equipe principal' });
    }
};

// src/controllers/EquipePrincipalController.js

// Buscar uma equipe principal pelo ID
exports.getEquipePrincipalById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscando a equipe principal pelo ID
        const equipePrincipal = await EquipePrincipal.findByPk(id, {
            include: {
                model: Formacao,  // Inclui a formação associada à equipe principal
                attributes: ['nome'] // Exemplo de atributo que você pode querer incluir da formação
            }
        });

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
        }

        // Retorna a equipe principal com o nome da formação incluído
        res.status(200).json(equipePrincipal);
    } catch (error) {
        console.error("Erro ao buscar equipe principal:", error);
        res.status(500).json({ error: 'Erro ao buscar equipe principal' });
    }
};

exports.updateEquipePrincipalNome = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, categoria, formacaoNome } = req.body;

    try {
        // Verifica se a equipe principal existe
        const equipePrincipal = await EquipePrincipal.findByPk(id, {
            include: { model: Formacao, as: 'formacao' }
        });

        if (!equipePrincipal) {
            return res.status(404).json({ error: 'Equipe Principal não encontrada' });
        }

        // Atualiza os dados da equipe principal
        equipePrincipal.nome = nome;
        equipePrincipal.descricao = descricao;
        equipePrincipal.categoria = categoria;

        // Atualiza a formação, se fornecido
        if (formacaoNome) {
            const formacao = await Formacao.findOne({ where: { nome: formacaoNome } });
            if (formacao) {
                equipePrincipal.formacaoId = formacao.id;
            }
        }

        await equipePrincipal.save(); // Salva as alterações

        res.status(200).json(equipePrincipal); // Retorna a equipe principal atualizada
    } catch (error) {
        console.error("Erro ao atualizar equipe principal:", error);
        res.status(500).json({ error: 'Erro ao atualizar equipe sombra' });
    }
};

exports.deleteEquipePrincipal = async (req, res) => {
    try {
        const { id } = req.params;

        // Encontrar e excluir a equipe principal pelo ID
        const equipePrincipal = await EquipePrincipal.findByPk(id);

        if (!equipePrincipal) {
            return res.status(404).json({ message: 'Equipe principal não encontrada' });
        }

        await equipePrincipal.destroy();

        res.status(200).json({ message: 'Equipe principal excluída com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir equipe principal:", error);
        res.status(500).json({ message: 'Erro ao excluir equipe principal', error });
    }
};
