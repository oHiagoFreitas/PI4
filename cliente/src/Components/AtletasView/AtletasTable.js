import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Biblioteca para exportar para Excel
import '../../Style/AtletasView/AtletasTable.css';
import AtletasFilters from './AtletasFilters';
import CreateAthleteModal from '../CreateAthleteModal';
import EditAthleteModal from './EditAtletaModal';
import TabelaAtletas from './TabelaAtletas';
import ExportToPDF from './ExportToPDF';

function AtletasTable() {
  const [atletas, setAtletas] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAtleta, setSelectedAtleta] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/atletas/getAllAtletasAprovados')
      .then((response) => setAtletas(response.data))
      .catch((error) => console.error('Erro ao carregar atletas:', error));
  }, []);

  const openCreateAtletaModal = () => setIsCreateModalOpen(true);
  const closeCreateAtletaModal = () => setIsCreateModalOpen(false);

  const openEditAtletaModal = (atleta) => {
    setSelectedAtleta(atleta);
    setIsEditModalOpen(true);
  };

  const closeEditAtletaModal = () => {
    setSelectedAtleta(null);
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

  const filteredAtletas = atletas.filter((atleta) => {
    const matchesName = atleta.nome.toLowerCase().includes(filterText.toLowerCase());
    const matchesPosition = filterPosition ? atleta.posicao === filterPosition : true;
    const matchesYear = filterYear ? atleta.ano === parseInt(filterYear) : true;
    const matchesCountry = atleta.nacionalidade.toLowerCase().includes(filterCountry.toLowerCase());
    const matchesTeam = atleta.time?.nome?.toLowerCase().includes(filterTeam.toLowerCase()) ||
      atleta.clube?.toLowerCase().includes(filterTeam.toLowerCase());

    return matchesName && matchesPosition && matchesYear && matchesCountry && matchesTeam;
  });

  const uniquePositions = [...new Set(atletas.map((atleta) => atleta.posicao))];
  const uniqueYears = [...new Set(atletas.map((atleta) => atleta.ano))];
  const uniqueCountries = [...new Set(atletas.map((atleta) => atleta.nacionalidade))];
  const uniqueTeams = [...new Set(atletas.map((atleta) => (atleta.time ? atleta.time.nome : atleta.clube)))];

  // Função para exportar atletas para Excel
  const exportAtletasToExcel = () => {
    const headers = ['Nome', 'Posição', 'Ano', 'Nacionalidade', 'Clube'];
    const rows = filteredAtletas.map((atleta) => [
      atleta.nome,
      atleta.posicao,
      atleta.ano,
      atleta.nacionalidade,
      atleta.time?.nome || atleta.clube || 'N/A',
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Atletas');

    XLSX.writeFile(workbook, 'atletas.xlsx');
  };

  return (
    <div className="atletas-table-containerAT">
      <div className="actions-buttonsAT">
        <AtletasFilters
          filterText={filterText}
          filterPosition={filterPosition}
          filterYear={filterYear}
          filterCountry={filterCountry}
          filterTeam={filterTeam}
          uniquePositions={uniquePositions}
          uniqueYears={uniqueYears}
          onFilterTextChange={setFilterText}
          onFilterPositionChange={setFilterPosition}
          onFilterYearChange={setFilterYear}
          onFilterCountryChange={setFilterCountry}
          onFilterTeamChange={setFilterTeam}
        />
        <button className="button-createAT" onClick={openCreateAtletaModal}>
          Criar Atleta
        </button>
        <button className="button-exportAT" onClick={exportAtletasToExcel} style={{backgroundColor: "green"}}>
          Exportar em Excel
        </button>
        <ExportToPDF atletas={filteredAtletas} />
      </div>

      <TabelaAtletas
        atletas={filteredAtletas}
        handleEdit={openEditAtletaModal}
        handleDelete={handleDelete}
      />

      <CreateAthleteModal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateAtletaModal}
      />

      <EditAthleteModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditAtletaModal}
        athleteData={selectedAtleta}
      />
    </div>
  );
}

export default AtletasTable;
