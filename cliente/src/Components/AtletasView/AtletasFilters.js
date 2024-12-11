import React from 'react';
import '../../Style/AtletasView/AtletasFilters.css';

const AtletasFilters = ({
  filterText,
  filterPosition,
  filterYear,
  filterCountry, // Adicionado
  filterTeam,    // Adicionado
  uniquePositions,
  uniqueYears,
  onFilterTextChange,
  onFilterPositionChange,
  onFilterYearChange,
  onFilterCountryChange, // Adicionado
  onFilterTeamChange,    // Adicionado
}) => {
  return (
    <div className="filters-containerAT">
      {/* Filtro por nome */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar atleta pelo nome..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />

      {/* Filtro por posição */}
      <select
        className="filter-selectAT"
        value={filterPosition}
        onChange={(e) => onFilterPositionChange(e.target.value)}
      >
        <option value="">Todas as posições</option>
        {uniquePositions.map((posicao) => (
          <option key={posicao} value={posicao}>
            {posicao}
          </option>
        ))}
      </select>

      {/* Filtro por ano */}
      <select
        className="filter-selectAT"
        value={filterYear}
        onChange={(e) => onFilterYearChange(e.target.value)}
      >
        <option value="">Todos os anos</option>
        {uniqueYears.map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>

      {/* Filtro por país */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo país..."
        value={filterCountry}
        onChange={(e) => onFilterCountryChange(e.target.value)}
      />

      {/* Filtro por time */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo time..."
        value={filterTeam}
        onChange={(e) => onFilterTeamChange(e.target.value)}
      />
    </div>
  );
};

export default AtletasFilters;
