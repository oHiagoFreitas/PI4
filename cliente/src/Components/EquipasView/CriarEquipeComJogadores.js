import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import CriandoESTitle from "./CriandoESTitle";
import Modal from "./ModalJogadores";
import CampoFutebol from "./CampoFutebol";
import EquipeSombraForm from "./EquipeSombraForm";
import TabelaJogadores from "./TabelaJogadores"; // Importa o componente TabelaJogadores
import Swal from 'sweetalert2'; // Importando SweetAlert2
import "../../Style/EquipaSombra.css";
import { useNavigate } from 'react-router-dom';

function CriarEquipeComJogadores() {
    const navigate = useNavigate();
    const [equipeSombraId, setEquipeSombraId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({}); // Novo estado para armazenar ratings dos jogadores
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [formacao, setFormacao] = useState(""); // Novo estado para armazenar a formação

    console.log(equipeSombraId)

    const [userRole, setUserRole] = useState(null);
    
        useEffect(() => {
            const scoutId = localStorage.getItem('userId');
            const role = localStorage.getItem('userRole');
            console.log('Scout ID no localStorage:', scoutId);
            console.log('Role do utilizador no localStorage:', role);
    
            setUserRole(role); // Atualiza o estado
        }, []);

    useEffect(() => {
        console.log("Carregando jogadores...");
        fetch("http://localhost:3000/atletas/getAllAtletasAprovados")
            .then(response => response.json())
            .then(data => {
                setPlayers(data);
                console.log("Jogadores carregados:", data);
            })
            .catch(error => console.error("Erro ao carregar jogadores:", error));

        console.log("Carregando relatórios...");
        fetch("http://localhost:3000/relatorios")
            .then(response => response.json())
            .then(data => {
                const ratingsMap = data.reduce((acc, report) => {
                    acc[report.atletaId] = report.ratingFinal;
                    return acc;
                }, {});
                setRatings(ratingsMap);
                console.log("Relatórios carregados:", ratingsMap);
            })
            .catch(error => console.error("Erro ao carregar relatórios:", error));

        console.log("Carregando formação da equipe principal...");
        fetch(`http://localhost:3000/equipeSombra/${equipeSombraId}`)
            .then(response => response.json())
            .then(data => {
                if (data.formacao) {
                    setFormacao(data.formacao.nome); // Definir a formação no estado
                    console.log("Formação carregada:", data.formacao.nome);
                } else {
                    console.error("Formação não encontrada para a equipe:", equipeSombraId);
                }
            })
            .catch(error => console.error("Erro ao carregar formação:", error));
    }, [equipeSombraId]);

    // Função para abrir a modal com as informações do jogador
    const openModal = (playerPosition, positionId) => {
        setSelectedPlayer({ playerPosition, positionId });
        setIsModalOpen(true);
    };

    // Função para fechar a modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    // Função para alocar jogador na posição
    const assignPlayerToPosition = (player, positionId) => {
        // Verifica se já existe um jogador alocado nesta posição
        const oldPlayerId = positions[positionId]?.id;
    
        if (oldPlayerId) {
            // Remove o jogador antigo da base de dados
            fetch(`http://localhost:3000/equipePrincipal/remover-jogador/${oldPlayerId}`, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(data => {
                console.log("Jogador removido da posição:", data.message);
            })
            .catch(error => {
                console.error("Erro ao remover jogador:", error);
            });
        }
    
        // Adiciona o novo jogador à posição
        setPositions((prevPositions) => ({
            ...prevPositions,
            [positionId]: {
                id: player.id,
                nome: player.nome,
            },
        }));
    
        closeModal();
    };

    // Função para filtrar jogadores já selecionados
    const getAvailablePlayers = (selectedPosition) => {
        return players.filter(player => {
            // Verifica se o jogador já foi alocado em alguma posição
            const isAlreadyAssigned = Object.values(positions).some(p => p.id === player.id);

            // Permite jogadores cuja posição é igual à selecionada ou que sejam "universais"
            return !isAlreadyAssigned && (player.posicao === selectedPosition || player.posicao === "Universal");
        });
    };

    // Função para remover um jogador de uma posição
    const onRemovePlayer = (positionId) => {
        if (!positions[positionId]) return; // Se não houver jogador na posição, não faz nada

        Swal.fire({
            title: 'Tem certeza?',
            text: "Você deseja remover esse jogador da equipe?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove o jogador da posição no estado
                setPositions((prevPositions) => {
                    const newPositions = { ...prevPositions };
                    delete newPositions[positionId]; // Remove o jogador da posição
                    return newPositions;
                });

                // Remove o jogador da API
                fetch("http://localhost:3000/equipeSombra/remover-jogadores", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        equipeSombraId: equipeSombraId.toString(),
                        jogadoresIds: [positions[positionId].id], // ID do jogador a ser removido
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "Jogadores removidos com sucesso!") {
                            Swal.fire('Removido!', 'O jogador foi removido com sucesso.', 'success');
                        } else {
                            Swal.fire('Erro!', 'Erro ao remover o jogador.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao remover jogador:", error);
                        Swal.fire('Erro!', 'Erro ao remover o jogador.', 'error');
                    });
            }
        });
    };

    // Função para remover jogadores da equipe sombra
    const removePlayersFromEquipeSombra = () => {
        if (!equipeSombraId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'ID da equipe sombra não encontrado.',
            });
            return;
        }

        const playerIdsToRemove = Object.values(positions).map(player => player.id);

        fetch("http://localhost:3000/equipeSombra/remover-jogadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ equipeSombraId: equipeSombraId.toString(), jogadoresIds: playerIdsToRemove }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Jogadores removidos com sucesso!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Jogadores removidos da equipe com sucesso!',
                    });
                    setPositions({}); // Limpar as posições no estado após remoção
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao remover jogadores.',
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao remover jogadores:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Erro ao remover jogadores.',
                });
            });
    };

    // Função para salvar a equipe
    const salvarEquipe = () => {
        if (!equipeSombraId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'ID da equipe sombra não encontrado.',
            });
            return;
        }

        console.log("Equipe Sombra ID:", equipeSombraId);

        // Estrutura de jogadores e suas posições
        const requestData = {
            equipeSombraId: equipeSombraId.toString(),  // Garantir que seja uma string como no exemplo
            jogadoresIds: Object.values(positions).map(player => player.id),  // Mapeia os IDs dos jogadores para um array
            positions: Object.entries(positions).reduce((acc, [positionId, player]) => {
                acc[player.id] = positionId;  // Agora estamos mapeando o ID do jogador para a posição (ID -> posição)
                return acc;
            }, {})
        };

        console.log("Dados enviados:", requestData);

        fetch("http://localhost:3000/equipeSombra/jogadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Jogadores adicionados com sucesso!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Equipe salva com sucesso!',
                    }).then(() => {
                        // Após o usuário fechar a mensagem de sucesso, redireciona para a página /Equipas
                        navigate('/Equipas');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao salvar equipe.',
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao salvar equipe:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Erro ao salvar equipe.',
                });
            });
    };

    return (
        <div className="backoffice-container">
            <Sidebar userRole={userRole} />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <div className="criar-equipe-container">
                        <CriandoESTitle />

                        <CampoFutebol
                            positions={positions}
                            openModal={openModal}
                            formacao={formacao}
                        />
                        <div className="actions-buttonsAT" style={{ marginTop: "10px" }}>
                            <button onClick={salvarEquipe} className="button-createAT">
                                Salvar Equipe
                            </button>
                            <button onClick={removePlayersFromEquipeSombra} className="button-createAT">
                                Remover Jogadores
                            </button>
                        </div>

                        {/* Tabela de Jogadores */}
                        <TabelaJogadores positions={positions} ratings={ratings} onRemovePlayer={onRemovePlayer} formacao={formacao}/>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                playerPosition={selectedPlayer ? selectedPlayer.playerPosition : ""}
                positionId={selectedPlayer ? selectedPlayer.positionId : ""}
                closeModal={closeModal}
                players={getAvailablePlayers(selectedPlayer ? selectedPlayer.playerPosition : "")}
                assignPlayerToPosition={assignPlayerToPosition}
                ratings={ratings}
            />
            <EquipeSombraForm setEquipeSombraId={setEquipeSombraId} />
        </div>
    );
}

export default CriarEquipeComJogadores;
