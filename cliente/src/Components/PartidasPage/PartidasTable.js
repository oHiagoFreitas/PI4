// src/View/PartidasTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import CreateMatchModal from './CreateMatchModal.js'; // Modal de criação de partida (novo componente)
import TabelaPartidas from './TabelaPartidas'; // Componente da Tabela de Partidas

function PartidasTable() {
  const [partidas, setPartidas] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null); // Partida selecionada para edição

  useEffect(() => {
    axios
      .get('http://localhost:3000/partidas') // Rota de partidas
      .then((response) => setPartidas(response.data))
      .catch((error) => console.error('Erro ao carregar partidas:', error));
  }, []);

  const openCreatePartidaModal = () => setIsCreateModalOpen(true);
  const closeCreatePartidaModal = () => setIsCreateModalOpen(false);

  const openEditPartidaModal = (partida) => {
    setSelectedPartida(partida); // Define a partida selecionada
    setIsEditModalOpen(true);
  };

  const closeEditPartidaModal = () => {
    setSelectedPartida(null); // Reseta a partida selecionada
    setIsEditModalOpen(false);
  };

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

  return (
    <div className="partidas-table-container">
      {/* Botões de Ação: Criar Partida */}
      <div className="actions-buttons" style={{justifyContent: 'flex-end'}}>
        <button
          className="button-create"
          onClick={openCreatePartidaModal}
        >
          Criar Partida
        </button>
        {/* Botões adicionais (como exportar, se necessário) */}
        <button className="button-export">
          Exportar Partidas
        </button>
      </div>

      {/* Tabela com dados das partidas */}
      <TabelaPartidas 
        partidas={partidas}
        handleEdit={openEditPartidaModal}
        handleDelete={handleDelete}
      />

      {/* Modal de Criação de Partida */}
      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreatePartidaModal}
      />
    </div>
  );
}

export default PartidasTable;
