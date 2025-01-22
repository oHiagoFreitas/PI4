import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const JogadoresModal = () => {
  const [jogadores, setJogadores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null); // Estado para armazenar o jogador selecionado

  useEffect(() => {
    // Fazendo a requisição para obter os jogadores
    axios.get('https://pi4-hdnd.onrender.com/atletas/getAllAtletasAprovados')
      .then(response => {
        setJogadores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar jogadores:", error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selecionarJogador = (jogador) => {
    setJogadorSelecionado(jogador);  // Atualiza o estado com o jogador selecionado
    setIsModalOpen(false);  // Fecha a modal após selecionar o jogador
  };

  return (
    <div>
      <button onClick={openModal} className="submit-button">Selecione o Jogador</button>

      {/* Exibe o jogador selecionado abaixo do botão */}
      {jogadorSelecionado && (
        <div>
          <h3>Jogador Selecionado:</h3>
          <p><strong>Nome:</strong> {jogadorSelecionado.nome}</p>
          <p><strong>Posição:</strong> {jogadorSelecionado.posicao}</p>
          <p><strong>Clube:</strong> {jogadorSelecionado.clube}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Jogadores"
        ariaHideApp={false} // Necessário para o modal funcionar no React
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
                <th>Ação</th> {/* Nova coluna para o botão de seleção */}
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
                    {/* Botão de seleção do jogador */}
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

export default JogadoresModal;
