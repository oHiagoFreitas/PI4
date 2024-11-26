import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação

// Componente da Tabela de Relatórios
function TabelaRelatorios({ relatorios, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5; // Número de relatórios por página

  // Função para calcular os relatórios da página atual
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = relatorios.slice(indexOfFirstReport, indexOfLastReport);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(relatorios.length / reportsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
      {/* Tabela com dados dos relatórios */}
      <table className="atletas-tableAT table table-striped">
        <thead>
          <tr>
            <th>Data de Criação</th>
            <th>Nome do Atleta</th>
            <th>Nome do Scout</th>
            <th>Rating</th>
            <th>Comentario</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.length > 0 ? (
            currentReports.map((relatorio) => (
              <tr key={relatorio.id}>
                <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
                <td>{relatorio.atleta.nome}</td> {/* Nome do Atleta */}
                <td>{relatorio.utilizador.nome}</td> {/* Nome do Scout */}
                <td>{relatorio.ratingFinal}</td>
                <td>{relatorio.comentario}</td>
                <td>
                  {/* Botão para visualizar */}
                  <Link to={`/relatorios/detalhes/${relatorio.id}`} className="action-buttonAT dashboard-link">
                    <i className="bi bi-eye" title="Ver"></i>
                  </Link>

                  {/* Botão para editar */}
                  <button
                    className="action-buttonAT"
                    onClick={() => handleEdit(relatorio)}
                  >
                    <i className="bi bi-pencil" title="Editar"></i>
                  </button>

                  {/* Botão para apagar */}
                  <button
                    className="action-buttonAT"
                    onClick={() => handleDelete(relatorio.id)}
                  >
                    <i className="bi bi-trash" title="Apagar"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="loading-messageAT">Nenhum relatório Encontrado</td>
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

export default TabelaRelatorios;
