import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import TabelaPartidas from './TabelaPartidas'; // Componente da Tabela de Partidas
import TabelaJogosAtribuidos from './TabelaJogosAtribuidos'; // Componente da Tabela de Jogos Atribuídos
import { useNavigate } from 'react-router-dom';

function PartidasTable() {
  const [partidas, setPartidas] = useState([]); // Estado para todas as partidas
  const [jogosAtribuidos, setJogosAtribuidos] = useState([]); // Estado para jogos atribuídos ao usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage

    if (!userId) {
      Swal.fire('Erro', 'Usuário não está logado.', 'error');
      navigate('/login'); // Redireciona para login se o ID não for encontrado
      return;
    }

    // Carrega todas as partidas
    axios
      .get('http://localhost:3000/partidas') // Rota para buscar todas as partidas
      .then((response) => setPartidas(response.data))
      .catch((error) => console.error('Erro ao carregar partidas:', error));

    // Carrega as partidas atribuídas ao usuário logado
    axios
      .get(`http://localhost:3000/partidas/atribuidas/${userId}`) // Rota de partidas atribuídas
      .then((response) => setJogosAtribuidos(response.data))
      .catch((error) => console.error('Erro ao carregar jogos atribuídos:', error));
  }, [navigate]);

  const handleDelete = (partidaId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir a partida ${partidaId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/partidas/${partidaId}`) // Rota de delete de partidas
          .then(() => {
            Swal.fire('Deletado!', 'A partida foi excluída.', 'success');
            setPartidas(partidas.filter((partida) => partida.id !== partidaId));
          })
          .catch((error) => {
            console.error('Erro ao excluir partida:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir a partida.', 'error');
          });
      }
    });
  };

  const handleCreatePartida = () => {
    navigate('/criar-partida'); // Redireciona para a página de criação de partida
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Botões de Ação */}
      <div className="actions-buttonsAT" style={{ justifyContent: 'flex-end' }}>
        <button
          className="button-createAT"
          onClick={handleCreatePartida} // Lógica de navegação para criação de partida
        >
          Criar Partida
        </button>
        <button className="button-exportAT">Exportar Partidas</button>
      </div>

      {/* Tabela com dados das partidas */}
      <TabelaPartidas 
        partidas={partidas}
        handleEdit={() => {/* Lógica de edição sem modal */}}
        handleDelete={handleDelete}
      />

      {/* Tabela com jogos atribuídos ao usuário */}
      <div className="tabela-jogos-atribuídos">
        <h2>Meus Jogos</h2>
        <TabelaJogosAtribuidos jogosAtribuidos={jogosAtribuidos} />
      </div>
    </div>
  );
}

export default PartidasTable;
