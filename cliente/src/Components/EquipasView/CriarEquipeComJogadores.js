import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para capturar os parâmetros da URL
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import CriandoESTitle from "./CriandoESTitle";
import Modal from "./ModalJogadores";
import "../../Style/EquipaSombra.css";

function CriarEquipeComJogadores() {
    const { id } = useParams(); // Captura o ID da URL
    console.log("ID capturado da URL:", id);
    const [equipeSombraId, setEquipeSombraId] = useState(null); // Inicializa como null
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    // Atualiza o estado 'equipeSombraId' com o valor de 'id' quando o componente for montado
    useEffect(() => {
        if (id) {
            setEquipeSombraId(id); // Atualiza o ID da equipe sombra com o valor da URL
        }
        console.log("ID da equipe sombra:", equipeSombraId);
    }, [id]); // Só será atualizado se o ID mudar

    // Função para carregar os jogadores da API
    useEffect(() => {
        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));
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

    // Função para salvar a equipe
    const salvarEquipe = () => {
        if (!equipeSombraId) {
            alert("ID da equipe sombra não encontrado.");
            return;
        }

        console.log("Equipe Sombra ID:", equipeSombraId); // Verifique se o ID está correto

        const jogadoresIds = Object.values(positions).map(player => player.id);
        const requestData = {
            equipeSombraId: equipeSombraId, // Passando o ID da equipe sombra
            jogadoresIds: jogadoresIds, // Passando os IDs dos jogadores
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
                    alert("Equipe salva com sucesso!");
                } else {
                    alert("Erro ao salvar equipe.");
                }
            })
            .catch(error => {
                console.error("Erro ao salvar equipe:", error);
                alert("Erro ao salvar equipe.");
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

                        <div className="campo-futebol">
                            <div
                                className="jogador"
                                style={{ top: '53.5%', left: '19%' }}
                                title="Guarda redes"
                                onClick={() => openModal("Guarda redes", "pos1")}
                            >
                                {positions["pos1"] ? positions["pos1"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '30%', left: '28%' }}
                                title="Defesa Esquerda"
                                onClick={() => openModal("Defesa Esquerda", "pos2")}
                            >
                                {positions["pos2"] ? positions["pos2"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '45%', left: '26%' }}
                                title="Defesa Central"
                                onClick={() => openModal("Defesa Central", "pos3")}
                            >
                                {positions["pos3"] ? positions["pos3"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '60%', left: '26%' }}
                                title="Defesa Central"
                                onClick={() => openModal("Defesa Central", "pos4")}
                            >
                                {positions["pos4"] ? positions["pos4"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '75%', left: '28%' }}
                                title="Defesa Direita"
                                onClick={() => openModal("Defesa Direita", "pos5")}
                            >
                                {positions["pos5"] ? positions["pos5"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '53.5%', left: '45%' }}
                                title="Meio Campista"
                                onClick={() => openModal("Meio Campista", "pos6")}
                            >
                                {positions["pos6"] ? positions["pos6"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '66%', left: '37%' }}
                                title="Meio Campista"
                                onClick={() => openModal("Meio Campista", "pos7")}
                            >
                                {positions["pos7"] ? positions["pos7"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '40%', left: '37%' }}
                                title="Meio Campista"
                                onClick={() => openModal("Meio Campista", "pos8")}
                            >
                                {positions["pos8"] ? positions["pos8"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '35%', left: '52%' }}
                                title="Atacante"
                                onClick={() => openModal("Atacante", "pos9")}
                            >
                                {positions["pos9"] ? positions["pos9"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '75%', left: '52%' }}
                                title="Atacante"
                                onClick={() => openModal("Atacante", "pos10")}
                            >
                                {positions["pos10"] ? positions["pos10"].nome : ""}
                            </div>
                            <div
                                className="jogador"
                                style={{ top: '53.5%', left: '56%' }}
                                title="Atacante"
                                onClick={() => openModal("Atacante", "pos11")}
                            >
                                {positions["pos11"] ? positions["pos11"].nome : ""}
                            </div>
                        </div>

                        <button onClick={salvarEquipe} className="btn-salvar-equipe">
                            Salvar Equipe
                        </button>
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
        </div>
    );
}

export default CriarEquipeComJogadores;