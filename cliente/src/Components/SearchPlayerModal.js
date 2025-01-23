import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CreateReportModal from './CreateReportModal'; // Importar a CreateReportModal

const SearchPlayerModal = () => {
  const [jogadores, setJogadores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);

  useEffect(() => {
    axios.get('https://pi4-hdnd.onrender.com/atletas/getAllAtletasAprovados')
      .then(response => setJogadores(response.data))
      .catch(error => console.error("Erro ao buscar jogadores:", error));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selecionarJogador = (jogador) => {
    setJogadorSelecionado(jogador);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal} className="submit-button">Selecione o Jogador</button>

      {jogadorSelecionado && (
        <CreateReportModal
          isOpen={true}
          onRequestClose={() => {}}
          atletaNome={jogadorSelecionado.nome} // Passar o nome do jogador selecionado para a modal
        />
      )}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Jogadores Aprovados</h2>
        <button onClick={closeModal}>Fechar</button>
        <table border="1">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Posição</th>
              <th>Clube</th>
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
                <td><button onClick={() => selecionarJogador(jogador)}>Selecionar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default SearchPlayerModal;
