import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import CriandoESTitle from "./TitleCreateEquipePrincipal";
import Modal from "../ModalJogadores";
import CampoFutebol from "../CampoFutebol";
import EquipePrincipalForm from "./EquipePrincipalForm"; // Mudança no nome do componente
import TabelaJogadores from "../TabelaJogadores"; // Importa o componente TabelaJogadores
import Swal from 'sweetalert2'; // Importando SweetAlert2
import "../../../Style/EquipaSombra.css";
import { useNavigate } from 'react-router-dom';

function CriarEquipeComJogadores() {
    const navigate = useNavigate();
    const [equipePrincipalId, setEquipePrincipalId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({}); // Adiciona o estado para ratings
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [formacao, setFormacao] = useState(""); // Novo estado para armazenar a formação

    console.log("ID da equipe principal:", equipePrincipalId, "Formação:", formacao);
    

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);

        setUserRole(role); // Atualiza o estado
    }, []);

    // Carregar os jogadores e a formação da equipe principal
    useEffect(() => {
        if (!equipePrincipalId) return; // Se não houver ID, não faz nada.

        console.log("Carregando jogadores...");
        fetch("http://localhost:3000/atletas")
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
        fetch(`http://localhost:3000/equipePrincipal/${equipePrincipalId}`)
            .then(response => response.json())
            .then(data => {
                if (data.formacao) {
                    setFormacao(data.formacao.nome); // Definir a formação no estado
                    console.log("Formação carregada:", data.formacao.nome);
                } else {
                    console.error("Formação não encontrada para a equipe:", equipePrincipalId);
                }
            })
            .catch(error => console.error("Erro ao carregar formação:", error));
    }, [equipePrincipalId]);

    const openModal = (playerPosition, positionId) => {
        console.log("Abrindo modal para posição:", playerPosition, "ID da posição:", positionId);
        setSelectedPlayer({ playerPosition, positionId });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Fechando modal.");
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

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

    const getAvailablePlayers = (selectedPosition) => {
        return players.filter(player => {
            // Verifica se o jogador já foi alocado em alguma posição
            const isAlreadyAssigned = Object.values(positions).some(p => p.id === player.id);

            // Permite jogadores cuja posição é igual à selecionada ou que sejam "universais"
            return !isAlreadyAssigned && (player.posicao === selectedPosition || player.posicao === "Universal");
        });
    };

    const onRemovePlayer = (positionId) => {
        console.log("Removendo jogador da posição:", positionId);
        setPositions((prevPositions) => {
            const newPositions = { ...prevPositions };
            delete newPositions[positionId];
            return newPositions;
        });
    };

    const removePlayersFromEquipePrincipal = () => {
        if (!equipePrincipalId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'ID da equipe principal não encontrado.',
            });
            console.error("ID da equipe principal não encontrado.");
            return;
        }

        const playerIdsToRemove = Object.values(positions).map(player => player.id);

        console.log("Removendo jogadores da equipe principal:", playerIdsToRemove);
        fetch("http://localhost:3000/equipePrincipal/remover-jogadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ equipePrincipalId: equipePrincipalId.toString(), jogadoresIds: playerIdsToRemove }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Jogadores removidos com sucesso!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Jogadores removidos da equipe com sucesso!',
                    });
                    console.log("Jogadores removidos com sucesso:", playerIdsToRemove);
                    setPositions({});
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao remover jogadores.',
                    });
                    console.error("Erro ao remover jogadores:", data.message);
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

    const salvarEquipe = () => {
        if (!equipePrincipalId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'ID da equipe principal não encontrado.',
            });
            console.error("ID da equipe principal não encontrado.");
            return;
        }

        const requestData = {
            equipePrincipalId: equipePrincipalId.toString(),
            jogadoresIds: Object.values(positions).map(player => player.id),
            positions: Object.entries(positions).reduce((acc, [positionId, player]) => {
                acc[player.id] = positionId;
                return acc;
            }, {}),
            formacao: formacao
        };

        console.log("Salvando equipe com os seguintes dados:", requestData);
        fetch("http://localhost:3000/equipePrincipal/jogadores", {
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
                    console.error("Erro ao salvar equipe:", data.message);
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
                            formacao={formacao} // Passa a formação para o componente CampoFutebol
                        />
                        <div className="actions-buttonsAT" style={{ marginTop: "10px" }}>
                            <button
                                onClick={() => {
                                    salvarEquipe();
                                    window.history.back();
                                }}
                                className="button-createAT"
                            >
                                Salvar Equipe
                            </button>
                            <button onClick={removePlayersFromEquipePrincipal} className="button-createAT">
                                Remover Jogadores
                            </button>
                        </div>

                        <TabelaJogadores positions={positions} ratings={ratings} onRemovePlayer={onRemovePlayer} />
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
                ratings={ratings} // Passa os ratings para a modal
            />
            <EquipePrincipalForm setEquipePrincipalId={setEquipePrincipalId} />
        </div>
    );
}

export default CriarEquipeComJogadores;
