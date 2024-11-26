import React from 'react';
import '../Style/FiltroCategoria.css'; // Importando o arquivo de CSS para o filtro

function FiltroCategoria({ categoriaFiltro, setCategoriaFiltro }) {
  // Função para mudar o filtro de categoria
  const handleCategoriaFiltroChange = (event) => {
    setCategoriaFiltro(event.target.value);
  };

  return (
    <div className="filter-container d-flex justify-content-center align-items-center mb-4">
      <div className="filter-label-container">
        <label htmlFor="categoriaFiltro" className="filter-label h5">Filtrar por categoria:</label>
      </div>
      <div className="filter-select-container">
        <select
          id="categoriaFiltro"
          className="form-select filter-select"
          value={categoriaFiltro}
          onChange={handleCategoriaFiltroChange}
        >
          <option value="">Todas</option>
          <option value="Utilizador">Utilizador</option>
          <option value="Atleta">Atleta</option>
          <option value="Time">Time</option>
          <option value="Relatório">Relatório</option>
        </select>
      </div>
    </div>
  );
}

export default FiltroCategoria;
