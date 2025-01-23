import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const SearchPlayerModal = ({ onPlayerSelect }) => {
  const [jogadores, setJogadores] = useState([]);
  const [filteredJogadores, setFilteredJogadores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para a busca

  useEffect(() => {
    axios.get('https://pi4-hdnd.onrender.com/atletas/getAllAtletasAprovados')
      .then(response => {
        setJogadores(response.data);
        setFilteredJogadores(response.data); // Inicializa o filtro com todos os jogadores
      })
      .catch(error => {
        console.error("Erro ao buscar jogadores:", error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJogadores(jogadores); // Se a busca estiver vazia, mostra todos
    } else {
      setFilteredJogadores(jogadores.filter(jogador => 
        jogador.nome.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, jogadores]); // Atualiza o filtro sempre que a busca ou a lista de jogadores mudar

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selecionarJogador = (jogador) => {
    setJogadorSelecionado(jogador);
    onPlayerSelect(jogador);  // Chama a função passada via props
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="submit-button">Selecione o Jogador</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Jogadores"
        ariaHideApp={false}
      >
        <h2 style={{color: "#DEAF5E"}}>Jogadores Aprovados</h2>

        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        />
        
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="atletas-tableAT" style={{ width: '100%', tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Posição</th>
                <th>Clube</th>
                <th>Link</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredJogadores.map(jogador => (
                <tr key={jogador.id}>
                  <td>{jogador.nome}</td>
                  <td>{new Date(jogador.dataNascimento).toLocaleDateString()}</td>
                  <td>{jogador.posicao}</td>
                  <td>{jogador.clube}</td>
                  <td><a href={jogador.link} target="_blank" rel="noopener noreferrer" className="action-buttonAT dashboard-link">Perfil</a></td>
                  <td>
                    <button onClick={() => selecionarJogador(jogador)} className="action-buttonAT">Selecionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={closeModal} className="submit-button">Fechar</button>
      </Modal>
    </div>
  );
};

export default SearchPlayerModal;
