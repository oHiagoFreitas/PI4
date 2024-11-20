import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import TabelaPartidas from './TabelaPartidas'; // Componente da Tabela de Partidas
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação

function PartidasTable() {
  const [partidas, setPartidas] = useState([]);
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    axios
      .get('http://localhost:3000/partidas') // Rota de partidas
      .then((response) => setPartidas(response.data))
      .catch((error) => console.error('Erro ao carregar partidas:', error));
  }, []);

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
      {/* Botões de Ação: Criar Partida */}
      <div className="actions-buttonsAT" style={{ justifyContent: 'flex-end' }}>
        <button
          className="button-createAT"
          onClick={handleCreatePartida} // Lógica de navegação para criação de partida
        >
          Criar Partida
        </button>
        {/* Botões adicionais (como exportar, se necessário) */}
        <button className="button-exportAT">
          Exportar Partidas
        </button>
      </div>

      {/* Tabela com dados das partidas */}
      <TabelaPartidas 
        partidas={partidas}
        handleEdit={() => {/* Lógica de edição sem modal */}}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default PartidasTable;
