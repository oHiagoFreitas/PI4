import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import EditarCampoFutebol from "../CampoFutebol"; // Nome atualizado para refletir a ação de edição
import TabelaJogadores from "../TabelaJogadores"; // Nome atualizado para refletir a edição de jogadores
import Modal from "../ModalJogadores";
import "../../../Style/EquipaSombra.css";
import "./TilteEditarEquipePrincipal"
import EquipasEditarTime from "./TilteEditarEquipePrincipal";

function EditarEquipePrincipal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formacao, setFormacao] = useState(""); // Novo estado para armazenar a formação
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);

        setUserRole(role); // Atualiza o estado
    }, []);

    // Armazena o ID da equipe principal no localStorage
    useEffect(() => {
        if (id) {
            localStorage.setItem('equipePrincipalId', id);
        }
    }, [id]);

    // Pega o ID da equipe principal armazenado no localStorage
    const equipePrincipalId = localStorage.getItem('equipePrincipalId');

    // Função para carregar os jogadores de uma equipe principal específica
    useEffect(() => {
        if (equipePrincipalId) {
            setLoading(true);
            // Carregar a formação da equipe principal
            fetch(`https://localhost:3000/equipePrincipal/${equipePrincipalId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.formacao) {
                        setFormacao(data.formacao.nome); // Definir a formação no estado
                    } else {
                        console.error("Formação não encontrada para a equipe:", equipePrincipalId);
                    }
                })
                .catch(error => console.error("Erro ao carregar formação:", error));

            fetch(`https://localhost:3000/equipePrincipal/${equipePrincipalId}/atletas`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Erro ao carregar jogadores da equipe.',
                        });
                    } else {
                        // Atualiza as posições com os jogadores da equipe, usando o nome da posição
                        const initialPositions = {};
                        data.forEach(jogador => {
                            initialPositions[jogador.posicao] = {
                                id: jogador.id,
                                nome: jogador.nome,
                                rating: ratings[jogador.id] || "N/A",
                            };
                        });
                        setPositions(initialPositions);
                    }
                })
                .catch(error => console.error("Erro ao carregar jogadores da equipe:", error))
                .finally(() => setLoading(false));
        }
    }, [equipePrincipalId, ratings]);

    // Função para carregar todos os jogadores disponíveis e os ratings
    useEffect(() => {
        fetch("https://localhost:3000/atletas/getAllADV")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));

        fetch("https://localhost:3000/relatorios")
            .then(response => response.json())
            .then(data => {
                const ratingsMap = data.reduce((acc, report) => {
                    acc[report.atletaId] = report.ratingFinal;
                    return acc;
                }, {});
                setRatings(ratingsMap);
            })
            .catch(error => console.error("Erro ao carregar relatórios:", error));
    }, []);

    const openModal = (playerPosition, positionId) => {
        setSelectedPlayer({ playerPosition, positionId });
        setIsModalOpen(true);
    };

    const getAvailablePlayers = (selectedPosition) => {
        return players.filter(player => {
            // Verifica se o jogador já foi alocado em alguma posição
            const isAlreadyAssigned = Object.values(positions).some(p => p.id === player.id);
    
            // Permite jogadores cuja posição é igual à selecionada ou que sejam "universais"
            return !isAlreadyAssigned && (player.posicao === selectedPosition || player.posicao === "Universal");
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    const assignPlayerToPosition = (newPlayer, positionId) => {
        const oldPlayer = positions[positionId];

        // Se houver um jogador antigo, removê-lo antes de adicionar o novo jogador
        if (oldPlayer) {
            // Realiza a chamada para remover o jogador antigo sem notificação ao usuário
            fetch("https://localhost:3000/equipePrincipal/remover-jogadores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: equipePrincipalId,
                    jogadoresIds: [oldPlayer.id],  // Envia o ID do jogador antigo
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Jogadores removidos com sucesso!") {
                        // Agora, adiciona o novo jogador à posição
                        setPositions(prevPositions => ({
                            ...prevPositions,
                            [positionId]: {
                                id: newPlayer.id,
                                nome: newPlayer.nome,
                            },
                        }));
                    }
                })
                .catch(error => {
                    console.error("Erro ao remover jogador:", error);
                });
        } else {
            // Se não houver jogador anterior, apenas atribui o novo jogador
            setPositions(prevPositions => ({
                ...prevPositions,
                [positionId]: {
                    id: newPlayer.id,
                    nome: newPlayer.nome,
                },
            }));
        }

        closeModal();  // Fecha o modal após a substituição
    };

    const onRemovePlayer = (positionId) => {
        const player = positions[positionId];

        // Se não houver jogador na posição, não faz nada
        if (!player) return;

        // Confirmação antes de remover
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você deseja remover esse jogador da equipe?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Realiza a chamada para remover o jogador
                fetch("https://localhost:3000/equipePrincipal/remover-jogadores", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        equipePrincipalId: equipePrincipalId,
                        jogadoresIds: [player.id],  // Envia o ID do jogador
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "Jogadores removidos com sucesso!") {
                            // Atualiza a UI após a remoção
                            setPositions(prevPositions => {
                                const newPositions = { ...prevPositions };
                                delete newPositions[positionId];  // Remove o jogador da posição
                                return newPositions;
                            });
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

    const salvarAlteracoes = () => {
        const requestData = {
            equipePrincipalId: equipePrincipalId,
            jogadoresIds: Object.values(positions).map(player => player.id),
            positions: Object.entries(positions).reduce((acc, [positionId, player]) => {
                acc[player.id] = positionId;
                return acc;
            }, {}),
        };

        fetch("https://localhost:3000/equipePrincipal/jogadores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Jogadores adicionados com sucesso!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Alterações salvas com sucesso!',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao salvar alterações.',
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao salvar alterações:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Erro ao salvar alterações.',
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
                        <EquipasEditarTime />

                        <EditarCampoFutebol
                            positions={positions}
                            openModal={openModal}
                            formacao={formacao} 
                        />

                        <div className="actions-buttonsAT" style={{ marginTop: "20px", justifyContent: "start" }}>
                            <button onClick={salvarAlteracoes} className="button-createAT">
                                Salvar Alterações
                            </button>
                            <button onClick={() => navigate(-1)} className="button-createAT">Voltar</button>
                        </div>

                        <TabelaJogadores
                            positions={positions}
                            ratings={ratings}
                            onRemovePlayer={onRemovePlayer}
                            formacao={formacao}
                        />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                playerPosition={selectedPlayer ? selectedPlayer.playerPosition : ""}
                positionId={selectedPlayer ? selectedPlayer.positionId : ""}
                closeModal={closeModal}
                players={getAvailablePlayers(selectedPlayer ? selectedPlayer.playerPosition : "")}
                assignPlayerToPosition={assignPlayerToPosition}
                ratings={ratings}
            />
        </div>
    );
}

export default EditarEquipePrincipal;
