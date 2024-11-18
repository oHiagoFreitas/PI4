import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css';
import CreateAthleteModal from '../CreateAthleteModal';  // Importando o modal de criação de atleta
import TabelaAtletas from './TabelaAtletas';  // Importando o componente TabelaAtletas
import ExportToPDF from './ExportToPDF';  // Importando o componente ExportToPDF

function AtletasTable() {
  const [atletas, setAtletas] = useState([]); // Estado para armazenar atletas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle da modal

  useEffect(() => {
    // Chama a API para obter os dados de atletas
    axios
      .get('http://localhost:3000/atletas')
      .then((response) => {
        setAtletas(response.data); // Armazena os dados no estado
      })
      .catch((error) => {
        console.error('Erro ao carregar atletas:', error);
      });
  }, []);

  // Função para abrir a modal
  const openCreateAtletaModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar a modal
  const closeCreateAtletaModal = () => {
    setIsModalOpen(false);
  };

  // Função para lidar com a ação de "Ver"
  const handleView = (atletaId) => {
    // Aqui você pode adicionar a lógica para visualizar detalhes do atleta
    Swal.fire({
      title: 'Detalhes do Atleta',
      text: `Mostrando detalhes do atleta ${atletaId}`,
      icon: 'info',
      confirmButtonText: 'Fechar'
    });
  };

  // Função para lidar com a ação de "Editar"
  const handleEdit = (atletaId) => {
    // Aqui você pode adicionar a lógica para editar o atleta
    Swal.fire({
      title: 'Editar Atleta',
      text: `Editando atleta ${atletaId}`,
      icon: 'warning',
      confirmButtonText: 'Fechar'
    });
  };

  // Função para lidar com a ação de "Apagar"
  const handleDelete = (atletaId) => {
    // Aqui você pode adicionar a lógica para excluir o atleta
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o atleta ${atletaId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Exemplo de chamada de API para excluir o atleta
        axios
          .delete(`http://localhost:3000/atletas/${atletaId}`)
          .then(() => {
            Swal.fire('Deletado!', 'O atleta foi excluído.', 'success');
            setAtletas(atletas.filter((atleta) => atleta.id !== atletaId)); // Remove o atleta da lista
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
        <ExportToPDF atletas={atletas} /> {/* Botão Exportar */}
      </div>

      {/* Tabela com dados dos atletas */}
      <TabelaAtletas 
        atletas={atletas} 
        handleView={handleView} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />

      {/* Modal de Criação de Atleta */}
      <CreateAthleteModal
        isOpen={isModalOpen}
        onRequestClose={closeCreateAtletaModal}
      />
    </div>
  );
}

export default AtletasTable;
