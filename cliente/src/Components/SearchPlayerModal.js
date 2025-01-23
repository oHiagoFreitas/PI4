import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const SearchPlayerModal = ({ onPlayerSelect }) => {
  const [jogadores, setJogadores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);

  useEffect(() => {
    axios.get('https://pi4-hdnd.onrender.com/atletas/getAllAtletasAprovados')
      .then(response => {
        setJogadores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar jogadores:", error);
      });
  }, []);

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
        <h2>Jogadores Aprovados</h2>
        <button onClick={closeModal}>Fechar</button>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table border="1" style={{ width: '100%' }}>
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
              {jogadores.map(jogador => (
                <tr key={jogador.id}>
                  <td>{jogador.nome}</td>
                  <td>{new Date(jogador.dataNascimento).toLocaleDateString()}</td>
                  <td>{jogador.posicao}</td>
                  <td>{jogador.clube}</td>
                  <td><a href={jogador.link} target="_blank" rel="noopener noreferrer">Perfil</a></td>
                  <td>
                    <button onClick={() => selecionarJogador(jogador)}>Selecionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default SearchPlayerModal;
