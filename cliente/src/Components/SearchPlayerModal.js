import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../Style/SearchPlayerModal.css';

const SearchPlayerModal = ({ isOpen, onRequestClose, onPlayerSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://pi4-hdnd.onrender.com/atletas`, {
                params: { search: searchTerm }, // Envia o termo de busca como parâmetro (ajuste conforme o backend)
            });
            setPlayers(response.data); // Assumindo que o retorno é uma lista de jogadores
        } catch (err) {
            setError('Erro ao buscar jogadores. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Procurar Jogador"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: 'auto',
                },
            }}
        >
            <h2>Procurar Jogador</h2>
            <div>
                <input
                    type="text"
                    placeholder="Digite o nome do jogador"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <button onClick={handleSearch} style={{ marginBottom: '20px' }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {players.map(player => (
                    <li key={player.id} style={{ cursor: 'pointer' }}>
                        <span onClick={() => onPlayerSelect(player.name)}>{player.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default SearchPlayerModal;
