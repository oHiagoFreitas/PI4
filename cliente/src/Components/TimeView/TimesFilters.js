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
        placeholder="Pesquisar por nome..."
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
        <option value="Sub-18">Sub-18</option>
        <option value="Sub-19">Sub-19</option>
        <option value="Sub-20">Sub-20</option>
        <option value="Sub-21">Sub-21</option>
        <option value="Sub-22">Sub-22</option>
        <option value="Sub-23">Sub-23</option>
        <option value="Seniors">Seniors</option>
      </select>

      {/* Filtro por país */}
      <input
        type="text"
        className="filter-inputAT"
        placeholder="Pesquisar por país..."
        value={filterCountry}
        onChange={(e) => onFilterCountryChange(e.target.value)}
      />
    </div>
  );
};

export default TimesFilters;