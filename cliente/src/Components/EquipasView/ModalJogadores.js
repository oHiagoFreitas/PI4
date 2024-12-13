import React, { useState, useEffect } from 'react';
import "../../Style/Modal.css"; // Estilos da modal

const ModalJogadores = ({ isOpen, playerPosition, closeModal, players, assignPlayerToPosition, positionId, fetchRatingById }) => {
    const [filterName, setFilterName] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    

    

    if (!isOpen) return null; // Não renderiza a modal se não estiver aberta

    // Extrai as posições únicas dos jogadores
    const uniquePositions = [...new Set(players.map(player => player.posicao))];

    const filteredPlayers = players.filter(player => {
        return player.nome.toLowerCase().includes(filterName.toLowerCase()) &&
            (filterPosition === '' || player.posicao === filterPosition);
    });

    console.log("Dados dos jogadores recebidos:", players);

    return (
        <div className="modal-overlay-MJ">
            <div className="modal-content-MJ">
                <h2>Escolha um Jogador para a Posição: {playerPosition}</h2>

                <div className="filters-containerAT">
                    {/* Filtro de Nome */}
                    <input
                        type="text"
                        placeholder="Filtrar por nome"
                        value={filterName}
                        onChange={e => setFilterName(e.target.value)}
                        className="filter-inputAT"
                    />

                    {/* Dropdown de Posição */}
                    <select
                        value={filterPosition}
                        onChange={e => setFilterPosition(e.target.value)}
                        className="filter-selectAT"
                    >
                        <option value="">Todos</option>
                        {uniquePositions.map((position, index) => (
                            <option key={index} value={position}>{position}</option>
                        ))}
                    </select>
                </div>

                {/* Tabela de jogadores */}
                <table className="players-table-MJ atletas-tableAT" style={{marginTop: "10px"}}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Posição</th>
                            
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.length > 0 ? (
                            filteredPlayers.map((player) => (
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
                                <td colSpan="4">Nenhum jogador encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="actions-buttonsAT">
                    <button className='button-createAT' onClick={closeModal}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalJogadores;
