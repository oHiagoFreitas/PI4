// src/View/TimesFilters.js

import React from 'react';
import '../../Style/AtletasView/AtletasFilters.css';

const TimesFilters = ({
  filterTeamName = '', // Inicializando com string vazia
  filterCategory = '', // Inicializando com string vazia
  filterCountry = '', // Inicializando com string vazia
  onFilterTeamNameChange,
  onFilterCategoryChange,
  onFilterCountryChange,
}) => {
  return (
    <div className="filters-containerAT">
      {/* Filtro por nome do time */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo nome do time..."
        value={filterTeamName}
        onChange={(e) => onFilterTeamNameChange(e.target.value)}
      />

      {/* Filtro por categoria */}
      <select
        className="filter-selectAT"
        value={filterCategory}
        onChange={(e) => onFilterCategoryChange(e.target.value)}
      >
        <option value="">Todas as categorias</option>
        <option value="Seniors">Seniors</option>
        <option value="Amador">Amador</option>
        <option value="Juvenil">Juvenil</option>
      </select>

      {/* Filtro por país */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Buscar pelo país..."
        value={filterCountry}
        onChange={(e) => onFilterCountryChange(e.target.value)}
      />
    </div>
  );
};

export default TimesFilters;
