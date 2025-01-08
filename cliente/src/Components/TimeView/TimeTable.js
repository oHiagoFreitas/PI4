import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'; // Importando a biblioteca jsPDF
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import CreateTeamModal from '../CreateTeamModal'; // Modal de criação de time
import TabelaTime from './TabelaTime'; // Componente da Tabela de Times
import TimesFilters from './TimesFilters'; // Componente de filtros de times

function TimesTable() {
  const [times, setTimes] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // Time selecionado para edição
  const [filterTeamName, setFilterTeamName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

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

  // Filtros de times
  const filteredTimes = times.filter((time) => {
    const nameMatch = filterTeamName ? time.nome.toLowerCase().includes(filterTeamName.toLowerCase()) : true;
    const categoryMatch = filterCategory ? time.categoria === filterCategory : true;
    const countryMatch = filterCountry ? time.pais.toLowerCase().includes(filterCountry.toLowerCase()) : true;

    return nameMatch && categoryMatch && countryMatch;
  });

  // Função para exportar times para PDF
  const exportTimesToPDF = () => {
    const doc = new jsPDF();

    // Adicionando título
    doc.setFontSize(18);
    doc.text('Lista de Times', 20, 20);

    // Definindo o formato da tabela
    const tableColumn = ['Nome do Time', 'Categoria', 'País'];
    const tableRows = filteredTimes.map((time) => [
      time.nome,
      time.categoria,
      time.pais,
    ]);

    // Adicionando a tabela ao PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Onde começa a tabela
      theme: 'grid', // Tema da tabela
    });

    // Gerando o PDF
    doc.save('times.pdf');
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Componente de filtros */}
      <div className="actions-buttonsAT">
        <TimesFilters
          filterTeamName={filterTeamName}
          filterCategory={filterCategory}
          filterCountry={filterCountry}
          onFilterTeamNameChange={(value) => setFilterTeamName(value)}
          onFilterCategoryChange={(value) => setFilterCategory(value)}
          onFilterCountryChange={(value) => setFilterCountry(value)}
        />

        {/* Botões de Ação: Criar Time e Exportar Times */}
        <button className="button-createAT" onClick={openCreateTimeModal}>
          Criar Time
        </button>
        <button className="button-exportAT" onClick={exportTimesToPDF}>
          Exportar Times em PDF
        </button>
      </div>

      {/* Tabela com dados dos times */}
      <TabelaTime
        times={filteredTimes}
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
