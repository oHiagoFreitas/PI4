// src/Components/Pagination.js

import React from 'react';
import '../Style/Pagination.css'; // Adicione um arquivo CSS para personalizar a aparência dos botões de paginação

const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className="pagination">
            <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Anterior
            </button>
            <span className="page-number">Página {currentPage} de {totalPages}</span>
            <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Próxima
            </button>
        </div>
    );
};

export default Pagination;
