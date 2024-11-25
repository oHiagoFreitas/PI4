// src/View/TimesTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import CreateTeamModal from '../CreateTeamModal'; // Modal de criação de time
import TabelaTime from './TabelaTime'; // Componente da Tabela de Times

function TimesTable() {
  const [times, setTimes] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // Time selecionado para edição

  useEffect(() => {
    axios
      .get('http://localhost:3000/times') // Rota de times
      .then((response) => setTimes(response.data))
      .catch((error) => console.error('Erro ao carregar times:', error));
  }, []);

  const openCreateTimeModal = () => setIsCreateModalOpen(true);
  const closeCreateTimeModal = () => setIsCreateModalOpen(false);

  const openEditTimeModal = (time) => {
    setSelectedTime(time); // Define o time selecionado
    setIsEditModalOpen(true);
  };

  const closeEditTimeModal = () => {
    setSelectedTime(null); // Reseta o time selecionado
    setIsEditModalOpen(false);
  };

  const handleDelete = (timeId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o time ${timeId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/times/${timeId}`) // Rota de delete de times
          .then(() => {
            Swal.fire('Deletado!', 'O time foi excluído.', 'success');
            setTimes(times.filter((time) => time.id !== timeId));
          })
          .catch((error) => {
            console.error('Erro ao excluir time:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o time.', 'error');
          });
      }
    });
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Botões de Ação: Criar Time */}
      <div className="actions-buttonsAT" style={{ justifyContent: 'flex-end' }}>
        <button
          className="button-createAT"
          onClick={openCreateTimeModal}
        >
          Criar Time
        </button>
        {/* Você pode adicionar outros botões, como o de exportação, aqui */}
        <button className="button-exportAT">
          Exportar Times
        </button>
      </div>

      {/* Tabela com dados dos times */}
      <TabelaTime 
        times={times}
        handleEdit={openEditTimeModal}
        handleDelete={handleDelete}
      />

      {/* Modal de Criação de Time */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateTimeModal}
      />
    </div>
  );
}

export default TimesTable;
