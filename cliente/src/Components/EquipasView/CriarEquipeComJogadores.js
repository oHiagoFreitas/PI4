// src/components/CriarEquipeComJogadores.js

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import CriandoESTitle from "./CriandoESTitle"; // Importe o componente CriandoESTitle
import Modal from "./ModalJogadores"; // Importando o componente Modal
import "../../Style/EquipaSombra.css"; // Estilos

function CriarEquipeComJogadores() {
    // Estado para controlar a visibilidade da modal, o jogador selecionado e os jogadores nas posições
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({}); // Armazenar os jogadores nas posições

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

    // Função para carregar os jogadores da API
    useEffect(() => {
        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));
    }, []);

    // Função para alocar jogador na posição
    const assignPlayerToPosition = (player, positionId) => {
        setPositions((prevPositions) => ({
            ...prevPositions,
            [positionId]: player, // Armazena o jogador na posição
        }));
        closeModal(); // Fecha a modal após a seleção
    };

    // Função para filtrar jogadores já selecionados
    const getAvailablePlayers = (selectedPosition) => {
        // Filtra jogadores que não estão alocados em nenhuma posição ainda
        return players.filter(player => 
            !Object.values(positions).some(p => p.id === player.id) && player.posicao === selectedPosition
        );
    };

    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <div className="criar-equipe-container">
                        {/* Inserindo o título CriandoESTitle */}
                        <CriandoESTitle />
                        
                        {/* Retângulo de Campo com a Imagem de Fundo */}
                        <div className="campo-futebol">
                            {/* Adicionando bolinhas de jogadores nas posições exatas com IDs únicos */}
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
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen} 
                playerPosition={selectedPlayer ? selectedPlayer.playerPosition : ""}
                positionId={selectedPlayer ? selectedPlayer.positionId : ""}
                closeModal={closeModal} 
                players={getAvailablePlayers(selectedPlayer ? selectedPlayer.playerPosition : "")} // Filtra jogadores disponíveis
                assignPlayerToPosition={assignPlayerToPosition} // Passa a função para a modal
            />
        </div>
    );
}

export default CriarEquipeComJogadores;
