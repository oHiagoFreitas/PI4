// src/View/RelatoriosTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import CreateReportModal from '../CreateReportModal'; // Modal de criação de relatório
import TabelaRelatorios from './TabelaRelatorios'; // Componente da Tabela de Relatórios

function RelatoriosTable() {
  const [relatorios, setRelatorios] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null); // Relatório selecionado para edição

  useEffect(() => {
    axios
      .get('http://localhost:3000/relatorios') // Rota de relatórios
      .then((response) => setRelatorios(response.data))
      .catch((error) => console.error('Erro ao carregar relatórios:', error));
  }, []);

  const openCreateRelatorioModal = () => setIsCreateModalOpen(true);
  const closeCreateRelatorioModal = () => setIsCreateModalOpen(false);

  const openEditRelatorioModal = (relatorio) => {
    setSelectedRelatorio(relatorio); // Define o relatório selecionado
    setIsEditModalOpen(true);
  };

  const closeEditRelatorioModal = () => {
    setSelectedRelatorio(null); // Reseta o relatório selecionado
    setIsEditModalOpen(false);
  };

  const handleDelete = (relatorioId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o relatório ${relatorioId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/relatorios/${relatorioId}`) // Rota de delete de relatórios
          .then(() => {
            Swal.fire('Deletado!', 'O relatório foi excluído.', 'success');
            setRelatorios(relatorios.filter((relatorio) => relatorio.id !== relatorioId));
          })
          .catch((error) => {
            console.error('Erro ao excluir relatório:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o relatório.', 'error');
          });
      }
    });
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Botões de Ação: Criar Relatório */}
      <div className="actions-buttonsAT">
        <button
          className="button-createAT"
          onClick={openCreateRelatorioModal}
        >
          Criar Relatório
        </button>
        {/* Você pode adicionar outros botões, como o de exportação, aqui */}
        <button className="button-exportAT">
          Exportar Relatórios
        </button>
      </div>

      {/* Tabela com dados dos relatórios */}
      <TabelaRelatorios 
        relatorios={relatorios}
        handleEdit={openEditRelatorioModal}
        handleDelete={handleDelete}
      />

      {/* Modal de Criação de Relatório */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateRelatorioModal}
      />
    </div>
  );
}

export default RelatoriosTable;
