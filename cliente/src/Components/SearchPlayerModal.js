import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../Style/MMJ_PFR.css'; // Supondo que você coloque os estilos acima em ModalStyles.css

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
      <button onClick={openModal} className="MMJ_PFR_submit-button">Selecione o Jogador</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Jogadores Aprovados"
        ariaHideApp={false}
        className="MMJ_PFR_ReactModal__Content"
        overlayClassName="MMJ_PFR_ReactModal__Overlay"
      >
        <h2>Jogadores Aprovados</h2>
        <button onClick={closeModal} className="MMJ_PFR_button-close">Fechar</button>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="MMJ_PFR_table">
            <thead>
              <tr>
                <th className="MMJ_PFR_th">Nome</th>
                <th className="MMJ_PFR_th">Data de Nascimento</th>
                <th className="MMJ_PFR_th">Posição</th>
                <th className="MMJ_PFR_th">Clube</th>
                <th className="MMJ_PFR_th">Link</th>
                <th className="MMJ_PFR_th">Ação</th>
              </tr>
            </thead>
            <tbody>
              {jogadores.map(jogador => (
                <tr key={jogador.id}>
                  <td className="MMJ_PFR_td">{jogador.nome}</td>
                  <td className="MMJ_PFR_td">{new Date(jogador.dataNascimento).toLocaleDateString()}</td>
                  <td className="MMJ_PFR_td">{jogador.posicao}</td>
                  <td className="MMJ_PFR_td">{jogador.clube}</td>
                  <td className="MMJ_PFR_td"><a href={jogador.link} target="_blank" rel="noopener noreferrer">Perfil</a></td>
                  <td className="MMJ_PFR_td">
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
