import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx'; // Biblioteca para exportar para Excel
import '../../Style/AtletasView/AtletasTable.css';
import CreateTeamModal from '../CreateTeamModal';
import TabelaTime from './TabelaTime';
import TimesFilters from './TimesFilters';

function TimesTable() {
  const [times, setTimes] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filterTeamName, setFilterTeamName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/times')
      .then((response) => setTimes(response.data))
      .catch((error) => console.error('Erro ao carregar times:', error));
  }, []);

  const openCreateTimeModal = () => setIsCreateModalOpen(true);
  const closeCreateTimeModal = () => setIsCreateModalOpen(false);

  const openEditTimeModal = (time) => {
    setSelectedTime(time);
    setIsEditModalOpen(true);
  };

  const closeEditTimeModal = () => {
    setSelectedTime(null);
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
          .delete(`http://localhost:3000/times/${timeId}`)
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

  const filteredTimes = times.filter((time) => {
    const nameMatch = filterTeamName ? time.nome.toLowerCase().includes(filterTeamName.toLowerCase()) : true;
    const categoryMatch = filterCategory ? time.categoria === filterCategory : true;
    const countryMatch = filterCountry ? time.pais.toLowerCase().includes(filterCountry.toLowerCase()) : true;

    return nameMatch && categoryMatch && countryMatch;
  });

  const exportTimesToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Lista de Times', 20, 20);

    const tableColumn = ['Nome do Time', 'Categoria', 'País'];
    const tableRows = filteredTimes.map((time) => [
      time.nome,
      time.categoria,
      time.pais,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
    });

    doc.save('times.pdf');
  };

  // Função para exportar times para Excel
  const exportTimesToExcel = () => {
    const headers = ['Nome do Time', 'Categoria', 'País', 'Descrição'];
    const rows = filteredTimes.map((time) => [
      time.nome,
      time.categoria,
      time.pais,
      time.descricao
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Times');

    XLSX.writeFile(workbook, 'times.xlsx');
  };

  return (
    <div className="atletas-table-containerAT">
      <div className="actions-buttonsAT">
        <TimesFilters
          filterTeamName={filterTeamName}
          filterCategory={filterCategory}
          filterCountry={filterCountry}
          onFilterTeamNameChange={(value) => setFilterTeamName(value)}
          onFilterCategoryChange={(value) => setFilterCategory(value)}
          onFilterCountryChange={(value) => setFilterCountry(value)}
        />
        <button className="button-createAT" onClick={openCreateTimeModal}>
          Criar Clube
        </button>
        <button className="button-exportAT" onClick={exportTimesToPDF}>
          Exportar Clubes em PDF
        </button>
        <button className="button-exportAT" onClick={exportTimesToExcel} style={{backgroundColor: "green"}}>
          Exportar Clubes em Excel
        </button>
      </div>

      <TabelaTime
        times={filteredTimes}
        handleEdit={openEditTimeModal}
        handleDelete={handleDelete}
      />

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateTimeModal}
      />
    </div>
  );
}

export default TimesTable;
