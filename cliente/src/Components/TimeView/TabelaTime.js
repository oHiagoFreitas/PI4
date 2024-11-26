import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação

// Componente da Tabela de Times
function TabelaTimes({ times, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const timesPerPage = 5; // Número de times por página

  // Função para calcular os times da página atual
  const indexOfLastTime = currentPage * timesPerPage;
  const indexOfFirstTime = indexOfLastTime - timesPerPage;
  const currentTimes = times.slice(indexOfFirstTime, indexOfLastTime);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(times.length / timesPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
      {/* Tabela com dados dos times */}
      <table className="atletas-tableAT table table-striped">
        <thead>
          <tr>
            <th>Nome do Time</th>
            <th>País</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentTimes.length > 0 ? (
            currentTimes.map((time) => (
              <tr key={time.id}>
                <td>{time.nome}</td> {/* Nome do Time */}
                <td>{time.pais}</td> {/* País */}
                <td>{time.categoria}</td> {/* Categoria */}
                <td>{time.descricao}</td> {/* Descrição do Time */}
                <td>
                  {/* Botão para visualizar */}
                  <Link to={`/times/detalhes/${time.id}`} className="action-buttonAT dashboard-link">
                    <i className="bi bi-eye" title="Ver"></i>
                  </Link>

                  {/* Botão para editar */}
                  <button
                    className="action-buttonAT"
                    onClick={() => handleEdit(time)}
                  >
                    <i className="bi bi-pencil" title="Editar"></i>
                  </button>

                  {/* Botão para apagar */}
                  <button
                    className="action-buttonAT"
                    onClick={() => handleDelete(time.id)}
                  >
                    <i className="bi bi-trash" title="Apagar"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="loading-message">Nenhum time encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Componente de Paginação */}
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default TabelaTimes;
