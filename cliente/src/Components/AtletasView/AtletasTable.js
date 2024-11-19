import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css';
import CreateAthleteModal from '../CreateAthleteModal'; 
import EditAthleteModal from './EditAtletaModal'; // Importando o modal de edição
import TabelaAtletas from './TabelaAtletas'; 
import ExportToPDF from './ExportToPDF'; 

function AtletasTable() {
  const [atletas, setAtletas] = useState([]); 
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAtleta, setSelectedAtleta] = useState(null); // Atleta selecionado para edição

  useEffect(() => {
    axios
      .get('http://localhost:3000/atletas')
      .then((response) => setAtletas(response.data))
      .catch((error) => console.error('Erro ao carregar atletas:', error));
  }, []);

  const openCreateAtletaModal = () => setIsCreateModalOpen(true);
  const closeCreateAtletaModal = () => setIsCreateModalOpen(false);

  const openEditAtletaModal = (atleta) => {
    setSelectedAtleta(atleta); // Define o atleta selecionado
    setIsEditModalOpen(true);
  };

  const closeEditAtletaModal = () => {
    setSelectedAtleta(null); // Reseta o atleta selecionado
    setIsEditModalOpen(false);
  };

  const handleDelete = (atletaId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o atleta ${atletaId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/atletas/${atletaId}`)
          .then(() => {
            Swal.fire('Deletado!', 'O atleta foi excluído.', 'success');
            setAtletas(atletas.filter((atleta) => atleta.id !== atletaId));
          })
          .catch((error) => {
            console.error('Erro ao excluir atleta:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o atleta.', 'error');
          });
      }
    });
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Botões para Criar e Exportar */}
      <div className="actions-buttonsAT">
        <button className="button-createAT" onClick={openCreateAtletaModal}>Criar Atleta</button>
        <ExportToPDF atletas={atletas} /> 
      </div>

      {/* Tabela com dados dos atletas */}
      <TabelaAtletas 
        atletas={atletas} 
        handleEdit={openEditAtletaModal} 
        handleDelete={handleDelete} 
      />

      {/* Modal de Criação de Atleta */}
      <CreateAthleteModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateAtletaModal}
      />

      {/* Modal de Edição de Atleta */}
      <EditAthleteModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditAtletaModal}
        athleteData={selectedAtleta} // Passa os dados do atleta selecionado
      />
    </div>
  );
}

export default AtletasTable;
