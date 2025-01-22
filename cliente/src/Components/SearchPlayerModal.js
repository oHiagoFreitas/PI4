import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../Style/CreateReportModal.css'; // Certifique-se de que o caminho para o CSS está correto

const SearchPlayerModal = ({ isOpen, onRequestClose, onPlayerSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError('Por favor, insira um termo de busca.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://pi4-hdnd.onrender.com/atletas`, {
                params: { search: searchTerm },
            });
            console.log('Jogadores retornados pela API:', response.data);
            setPlayers(response.data);
        } catch (err) {
            console.error('Erro na busca de jogadores:', err);
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
                    width: '600px',
                    height: 'auto',
                    maxHeight: '80vh',
                    overflowY: 'auto',
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
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <button onClick={handleSearch} style={{ marginBottom: '20px', padding: '8px 16px' }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Nome</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Clube</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id}>
                            <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                                {player.nome}
                            </td>
                            <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                                {player.time ? player.time.nome : player.clube}
                            </td>
                            <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                                <button
                                    onClick={() => onPlayerSelect(player.nome)} // Passa o nome do jogador ao selecionar
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Selecionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {players.length === 0 && !loading && !error && (
                <p style={{ marginTop: '20px', textAlign: 'center' }}>Nenhum jogador encontrado.</p>
            )}
        </Modal>
    );
};

export default SearchPlayerModal;
