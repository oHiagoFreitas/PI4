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

function CriarEquipeComJogadores() {
    const [equipeSombraId, setEquipeSombraId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({}); // Novo estado para armazenar ratings dos jogadores
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    // Função para carregar os jogadores da API
    useEffect(() => {
        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));
    }, []);

    // Função para carregar os ratings dos jogadores
    useEffect(() => {
        fetch("http://localhost:3000/relatorios")
            .then(response => response.json())
            .then(data => {
                // Mapeia os ratings para o id do atleta
                const ratingsMap = data.reduce((acc, report) => {
                    acc[report.atletaId] = report.ratingFinal;
                    return acc;
                }, {});
                setRatings(ratingsMap);
            })
            .catch(error => console.error("Erro ao carregar relatórios:", error));
    }, []);

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
        setPositions((prevPositions) => ({
            ...prevPositions,
            [positionId]: {
                id: player.id,
                nome: player.nome,
                rating: ratings[player.id] || "N/A", // Adiciona o rating ao jogador
            },
        }));
        closeModal(); // Fecha a modal após a seleção
    };

    // Função para filtrar jogadores já selecionados
    const getAvailablePlayers = (selectedPosition) => {
        return players.filter(player =>
            !Object.values(positions).some(p => p.id === player.id) && player.posicao === selectedPosition
        );
    };

    // Função para remover um jogador de uma posição
    const onRemovePlayer = (positionId) => {
        setPositions((prevPositions) => {
            const newPositions = { ...prevPositions };
            delete newPositions[positionId]; // Remove o jogador da posição
            return newPositions;
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

        const jogadoresIds = Object.values(positions).map(player => player.id);
        const requestData = {
            equipeSombraId: equipeSombraId,
            jogadoresIds: jogadoresIds,
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
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <div className="criar-equipe-container">
                        <CriandoESTitle />

                        <CampoFutebol
                            positions={positions}
                            openModal={openModal}
                        />
                        <div className="actions-buttonsAT" style={{marginTop: "10px"}}>
                            <button onClick={salvarEquipe} className="button-createAT ">
                                Salvar Equipe
                            </button>
                        </div>

                        {/* Tabela de Jogadores */}
                        <TabelaJogadores positions={positions} ratings={ratings} onRemovePlayer={onRemovePlayer} />

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
            />
            <EquipeSombraForm setEquipeSombraId={setEquipeSombraId} />
        </div>
    );
}

export default CriarEquipeComJogadores;
