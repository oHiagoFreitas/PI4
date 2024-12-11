// src/View/RelatoriosFilters.js

import React from 'react';
import '../../Style/AtletasView/AtletasFilters.css';

const RelatoriosFilters = ({
  filterDate,
  filterAthleteName,
  filterScoutName,
  filterRating,
  onFilterDateChange,
  onFilterAthleteNameChange,
  onFilterScoutNameChange,
  onFilterRatingChange,
}) => {
  return (
    <div className="filters-containerAT">
      {/* Filtro por data de criação */}
      <input
        type="date"
        className="filter-inputAT"
        value={filterDate}
        onChange={(e) => onFilterDateChange(e.target.value)}
      />

      {/* Filtro por nome do atleta */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo nome do atleta..."
        value={filterAthleteName}
        onChange={(e) => onFilterAthleteNameChange(e.target.value)}
      />

      {/* Filtro por nome do scout */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo nome do scout..."
        value={filterScoutName}
        onChange={(e) => onFilterScoutNameChange(e.target.value)}
      />

      {/* Filtro por rating */}
      <select
        className="filter-selectAT"
        value={filterRating}
        onChange={(e) => onFilterRatingChange(e.target.value)}
      >
        <option value="">Todos os ratings</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default RelatoriosFilters;
