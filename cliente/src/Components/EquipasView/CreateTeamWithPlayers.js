// src/components/CriarEquipeComJogadores.js

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import CriandoESTitle from "./CriandoESTitle"; // Importe o componente CriandoESTitle
import Modal from "./ModalJogadores"; // Importando o componente Modal
import "../../Style/EquipaSombra.css"; // Estilos

function CriarEquipeComJogadores() {
    // Estado para controlar a visibilidade da modal e o jogador selecionado
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [players, setPlayers] = useState([]);

    // Função para abrir a modal com as informações do jogador
    const openModal = (playerPosition) => {
        setSelectedPlayer(playerPosition);
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
                            {/* Adicionando bolinhas de jogadores nas posições exatas */}
                            <div className="jogador" style={{ top: '53.5%', left: '19%' }} title="Guarda-redes" onClick={() => openModal("Guarda redes")}></div>
                            <div className="jogador" style={{ top: '30%', left: '28%' }} title="Defesa-Esquerda" onClick={() => openModal("Defesa Esquerda")}></div>
                            <div className="jogador" style={{ top: '45%', left: '26%' }} title="Defesa-Central" onClick={() => openModal("Defesa Central")}></div>
                            <div className="jogador" style={{ top: '60%', left: '26%' }} title="Defesa-Central" onClick={() => openModal("Defesa Central")}></div>
                            <div className="jogador" style={{ top: '75%', left: '28%' }} title="Defesa-Direita" onClick={() => openModal("Defesa Direita")}></div>
                            <div className="jogador" style={{ top: '53.5%', left: '45%' }} title="Meio Campista" onClick={() => openModal("Meio Campista")}></div>
                            <div className="jogador" style={{ top: '66%', left: '37%' }} title="Meio Campista" onClick={() => openModal("Meio Campista")}></div>
                            <div className="jogador" style={{ top: '40%', left: '37%' }} title="Meio Campista" onClick={() => openModal("Meio Campista")}></div>
                            <div className="jogador" style={{ top: '35%', left: '52%' }} title="Atacante" onClick={() => openModal("Atacante")}></div>
                            <div className="jogador" style={{ top: '75%', left: '52%' }} title="Atacante" onClick={() => openModal("Atacante")}></div>
                            <div className="jogador" style={{ top: '53.5%', left: '56%' }} title="Atacante" onClick={() => openModal("Atacante")}></div>
                            {/* Adicione mais bolinhas conforme necessário */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen} 
                playerPosition={selectedPlayer} 
                closeModal={closeModal} 
                players={players.filter(player => player.posicao === selectedPlayer)} // Filtra jogadores com base na posição
            />
        </div>
    );
}

export default CriarEquipeComJogadores;
