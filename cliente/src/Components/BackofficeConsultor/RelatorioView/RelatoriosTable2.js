// src/View/RelatoriosTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import CreateReportModal from '../../CreateReportModal'; // Modal de criação de relatório
import TabelaRelatorios from './TabelaRelatorios2'; // Componente da Tabela de Relatórios
import RelatoriosFilters from '../../RelatorioView/RelatoriosFilters'; // Componente de filtros de relatórios

function RelatoriosTable() {
  const [relatorios, setRelatorios] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null); // Relatório selecionado para edição
  const [filterDate, setFilterDate] = useState('');
  const [filterAthleteName, setFilterAthleteName] = useState('');
  const [filterScoutName, setFilterScoutName] = useState('');
  const [filterRating, setFilterRating] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/relatorios') // Rota de relatórios
      .then((response) => setRelatorios(response.data))
      .catch((error) => console.error('Erro ao carregar relatórios:', error));
  }, []);



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

  // Filtros de relatórios
  const filteredRelatorios = relatorios.filter((relatorio) => {
    const dateMatch = filterDate ? new Date(relatorio.createdAt).toISOString().includes(filterDate) : true;
    const athleteNameMatch = filterAthleteName ? relatorio.atleta.nome.toLowerCase().includes(filterAthleteName.toLowerCase()) : true;
    const scoutNameMatch = filterScoutName ? relatorio.utilizador.nome.toLowerCase().includes(filterScoutName.toLowerCase()) : true;
    const ratingMatch = filterRating ? relatorio.ratingFinal.toString() === filterRating : true;

    return dateMatch && athleteNameMatch && scoutNameMatch && ratingMatch;
  });

  return (
    <div className="atletas-table-containerAT">
      {/* Componente de filtros */}
      <div className="actions-buttonsAT" >
      <RelatoriosFilters
        filterDate={filterDate}
        filterAthleteName={filterAthleteName}
        filterScoutName={filterScoutName}
        filterRating={filterRating}
        onFilterDateChange={(value) => setFilterDate(value)}
        onFilterAthleteNameChange={(value) => setFilterAthleteName(value)}
        onFilterScoutNameChange={(value) => setFilterScoutName(value)}
        onFilterRatingChange={(value) => setFilterRating(value)}
      />

      {/* Botões de Ação: Criar Relatório */}
      
        <button className="button-exportAT">
          Exportar Relatórios
        </button>
      </div>

      {/* Tabela com dados dos relatórios */}
      <TabelaRelatorios
        relatorios={filteredRelatorios}
        handleDelete={handleDelete}
      />

  
    </div>
  );
}

export default RelatoriosTable;
