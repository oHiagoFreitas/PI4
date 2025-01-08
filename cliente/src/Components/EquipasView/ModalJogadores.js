import React, { useState } from 'react';
import "../../Style/Modal.css"; // Estilos da modal

const ModalJogadores = ({ isOpen, playerPosition, closeModal, players, assignPlayerToPosition, positionId, ratings }) => {
    const [filterName, setFilterName] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    const [filterAgeRange, setFilterAgeRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    if (!isOpen) return null;

    const uniquePositions = [...new Set(players.map(player => player.posicao))];

    const calculateAge = (birthYear) => new Date().getFullYear() - birthYear;

    const filteredPlayers = players.filter(player => {
        const playerAge = calculateAge(player.ano);
        const isAgeMatch = filterAgeRange === '' ||
            (filterAgeRange === 'sub-20' && playerAge < 20) ||
            (filterAgeRange === 'sub-21' && playerAge <= 21) ||
            (filterAgeRange === 'sub-22' && playerAge <= 22) ||
            (filterAgeRange === 'sub-23' && playerAge <= 23) ||
            (filterAgeRange === 'Seniors' && playerAge <= 40);

        return player.nome.toLowerCase().includes(filterName.toLowerCase()) &&
            (filterPosition === '' || player.posicao === filterPosition) &&
            isAgeMatch;
    });

    const sortedPlayers = filteredPlayers.sort((a, b) => a.ano - b.ano);

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="modal-overlay-MJ">
            <div className="modal-content-MJ">
                {/* Ícone de Fechar no canto superior direito */}
                <span className="close-icon" onClick={closeModal}>&times;</span>
                <h2 style={{ color: "#DEAF5E" }}>Escolha um Jogador para a Posição: {playerPosition}</h2>

                <div className="filters-containerAT">
                    <input
                        type="text"
                        placeholder="Filtrar por nome"
                        value={filterName}
                        onChange={e => setFilterName(e.target.value)}
                        className="filter-inputAT"
                    />

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

                <table className="players-table-MJ atletas-tableAT" style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ano</th>
                            <th>Posição</th>
                            <th>Classificação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlayers.length > 0 ? (
                            currentPlayers.map((player) => (
                                <tr key={player.id}>
                                    <td>{player.nome}</td>
                                    <td>{player.ano}</td>
                                    <td>{player.posicao}</td>
                                    <td>{ratings[player.id] || 'N/A'}</td>
                                    <td>
                                        <button onClick={() => assignPlayerToPosition(player, positionId)}>
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

                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
                    <span>{currentPage} de {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)}>Próxima</button>
                </div>

            
            </div>
        </div>
    );
};

export default ModalJogadores;
