import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import EditarCampoFutebol from "./CampoFutebol";
import TabelaJogadores from "./TabelaJogadores";
import Modal from "./ModalJogadores";
import "../../Style/EquipaSombra.css";
import "./EquipasEditarTime";
import EquipasEditarTime from "./EquipasEditarTime";

function EditarEquipe() {
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

    useEffect(() => {
        if (id) {
            localStorage.setItem('equipeSombraId', id);
        }
    }, [id]);

    const equipeSombraId = localStorage.getItem('equipeSombraId');

    // Função para carregar a formação da equipe sombra específica
    useEffect(() => {
        if (equipeSombraId) {
            setLoading(true);
            fetch(`https://localhost:3000/equipeSombra/${equipeSombraId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.formacao) {
                        setFormacao(data.formacao.nome); // Definir a formação no estado
                    } else {
                        console.error("Formação não encontrada para a equipe:", equipeSombraId);
                    }
                })
                .catch(error => console.error("Erro ao carregar formação:", error));

            fetch(`https://localhost:3000/equipeSombra/${equipeSombraId}/atletas`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Erro ao carregar jogadores da equipe.',
                        });
                    } else {
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
    }, [equipeSombraId, ratings]);

    useEffect(() => {
        fetch("https://localhost:3000/atletas/getAllAtletasAprovados")
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

        if (oldPlayer) {
            fetch("https://localhost:3000/equipeSombra/remover-jogadores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: equipeSombraId,
                    jogadoresIds: [oldPlayer.id],
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Jogadores removidos com sucesso!") {
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
            setPositions(prevPositions => ({
                ...prevPositions,
                [positionId]: {
                    id: newPlayer.id,
                    nome: newPlayer.nome,
                },
            }));
        }

        closeModal();
    };

    const onRemovePlayer = (positionId) => {
        const player = positions[positionId];

        if (!player) return;

        Swal.fire({
            title: 'Tem certeza?',
            text: "Você deseja remover esse jogador da equipe?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://localhost:3000/equipeSombra/remover-jogadores", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        equipeSombraId: equipeSombraId,
                        jogadoresIds: [player.id],
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "Jogadores removidos com sucesso!") {
                            setPositions(prevPositions => {
                                const newPositions = { ...prevPositions };
                                delete newPositions[positionId];
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
            equipeSombraId: equipeSombraId,
            jogadoresIds: Object.values(positions).map(player => player.id),
            positions: Object.entries(positions).reduce((acc, [positionId, player]) => {
                acc[player.id] = positionId;
                return acc;
            }, {}),
        };

        fetch("https://localhost:3000/equipeSombra/jogadores", {
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
                            formacao={formacao} // Passa a formação como uma prop
                            openModal={openModal}
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

export default EditarEquipe;
