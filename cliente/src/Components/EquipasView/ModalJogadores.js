// src/components/ModalJogadores.js

import React from 'react';
import "../../Style/Modal.css"; // Estilos da modal

const ModalJogadores = ({ isOpen, playerPosition, closeModal, players, assignPlayerToPosition, positionId }) => {
    if (!isOpen) return null; // Não renderiza a modal se não estiver aberta

    return (
        <div className="modal-overlay-MJ">
            <div className="modal-content-MJ">
                <h2>Escolha um Jogador para a Posição: {playerPosition}</h2>

                {/* Tabela de jogadores */}
                <table className="players-table-MJ">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Posição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length > 0 ? (
                            players.map((player) => (
                                <tr key={player.id}>
                                    <td>{player.nome}</td>
                                    <td>{player.posicao}</td>
                                    <td>
                                        <button 
                                            onClick={() => assignPlayerToPosition(player, positionId)} // Atribui jogador à posição
                                        >
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Carregando jogadores...</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal-actions">
                    <button onClick={closeModal}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalJogadores;
