import React, { useState } from 'react';
import "../../Style/Modal.css"; // Estilos da modal

const ModalJogadores = ({ isOpen, playerPosition, closeModal, players, assignPlayerToPosition, positionId, ratings }) => {
    const [filterName, setFilterName] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    const [filterAgeRange, setFilterAgeRange] = useState('');  // Novo estado para faixa etária

    if (!isOpen) return null; // Não renderiza a modal se não estiver aberta

    // Extrai as posições únicas dos jogadores
    const uniquePositions = [...new Set(players.map(player => player.posicao))];

    // Função para calcular a idade de um jogador
    const calculateAge = (birthYear) => {
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    };

    // Filtra os jogadores
    const filteredPlayers = players.filter(player => {
        // Calcula a idade do jogador
        const playerAge = calculateAge(player.ano);
        
        // Aplica os filtros
        const isAgeMatch = filterAgeRange === '' || 
            (filterAgeRange === 'sub-20' && playerAge < 20) ||
            (filterAgeRange === 'sub-21' && playerAge <= 21) ||
            (filterAgeRange === 'sub-22' && playerAge <= 22) ||
            (filterAgeRange === 'sub-23' && playerAge <= 23) ||
            (filterAgeRange === 'Seniors' && playerAge <= 24 && playerAge <= 40);

        return player.nome.toLowerCase().includes(filterName.toLowerCase()) &&
            (filterPosition === '' || player.posicao === filterPosition) &&
            isAgeMatch;  // Verifica o filtro de idade
    });

    // Ordena os jogadores por ano de nascimento de forma decrescente
    const sortedPlayers = filteredPlayers.sort((a, b) => a.ano - b.ano);

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

                    {/* Dropdown de Faixa Etária */}
                    <select
                        value={filterAgeRange}
                        onChange={e => setFilterAgeRange(e.target.value)}
                        className="filter-selectAT"
                    >
                        <option value="">Todas as idades</option>
                        <option value="sub-20">Sub-20</option>
                        <option value="sub-21">Sub-21</option>
                        <option value="sub-22">Sub-22</option>
                        <option value="sub-23">Sub-23</option>
                        <option value="Seniors">Seniors</option>
                    </select>
                </div>

                {/* Tabela de jogadores */}
                <table className="players-table-MJ atletas-tableAT" style={{marginTop: "10px"}}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ano</th>
                            <th>Posição</th>
                            <th>Classificação</th> {/* Adiciona coluna de classificação */}
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers.length > 0 ? (
                            sortedPlayers.map((player) => (
                                <tr key={player.id}>
                                    <td>{player.nome}</td>
                                    <td>{player.ano}</td> {/* Exibe o ano de nascimento */}
                                    <td>{player.posicao}</td>
                                    <td>{ratings[player.id] ? ratings[player.id] : 'N/A'}</td> {/* Utiliza os ratings da prop */}
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
                                <td colSpan="5">Nenhum jogador encontrado</td>
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
