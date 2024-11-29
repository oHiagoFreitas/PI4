import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Swal from 'sweetalert2';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import EditarCampoFutebol from "./EditarCampoFutebol";
import TabelaJogadores from "./EditarTabelaJogadores";
import Modal from "./ModalJogadores";
import "../../Style/EquipaSombra.css";
import "./EquipasTitle"
import EquipasTitle from "./EquipasTitle";

function EditarEquipe() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/equipeSombra/${id}/atletas`)
            .then(response => response.json())
            .then(data => {
                setPositions(data.atletas.reduce((acc, jogador) => {
                    acc[jogador.posicao] = jogador;
                    return acc;
                }, {}));
            })
            .catch(error => console.error("Erro ao carregar dados da equipe:", error));

        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));

        fetch("http://localhost:3000/relatorios")
            .then(response => response.json())
            .then(data => {
                const ratingsMap = data.reduce((acc, report) => {
                    acc[report.atletaId] = report.ratingFinal;
                    return acc;
                }, {});
                setRatings(ratingsMap);
            })
            .catch(error => console.error("Erro ao carregar ratings:", error));
    }, [id]);

    const openModal = (playerPosition, positionId) => {
        setSelectedPlayer({ playerPosition, positionId });
        setIsModalOpen(true);
    };

    const getAvailablePlayers = (selectedPosition) => {
        return players.filter(player => {
            const isAlreadyAssigned = Object.values(positions).some(p => p.id === player.id);
            return !isAlreadyAssigned && player.posicao === selectedPosition;
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    const assignPlayerToPosition = (player, positionId) => {
        setPositions(prevPositions => ({
            ...prevPositions,
            [positionId]: {
                id: player.id,
                nome: player.nome,
            },
        }));
        closeModal();
    };

    const onRemovePlayer = (positionId) => {
        setPositions(prevPositions => {
            const newPositions = { ...prevPositions };
            delete newPositions[positionId];
            return newPositions;
        });
    };

    const salvarAlteracoes = () => {
        const requestData = {
            equipeSombraId: id,
            jogadoresIds: Object.values(positions).map(player => player.id),
            positions: Object.entries(positions).reduce((acc, [positionId, player]) => {
                acc[player.id] = positionId;
                return acc;
            }, {}),
        };

        fetch("http://localhost:3000/equipeSombra/jogadores", {
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
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <div className="criar-equipe-container">
                        <EquipasTitle />
                        <EditarCampoFutebol
                            positions={positions}
                            openModal={openModal}
                        />
                        <div className="actions-buttonsAT" style={{ marginTop: "10px" }}>
                            <button onClick={salvarAlteracoes} className="button-createAT">
                                Salvar Alterações
                            </button>
                        </div>
                        <TabelaJogadores
                            positions={positions}
                            ratings={ratings}
                            onRemovePlayer={onRemovePlayer}
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
            />
        </div>
    );
}

export default EditarEquipe;
