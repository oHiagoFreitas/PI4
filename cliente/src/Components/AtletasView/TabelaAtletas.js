import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Adicionando Link para navegação
import Pagination from '../Pagination'; // Importando o componente Pagination

function TabelaAtletas({ atletas, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const atletasPerPage = 5; // Quantidade de atletas por página

  // Lógica para determinar os atletas da página atual
  const indexOfLastAtleta = currentPage * atletasPerPage;
  const indexOfFirstAtleta = indexOfLastAtleta - atletasPerPage;
  const currentAtletas = atletas.slice(indexOfFirstAtleta, indexOfLastAtleta);

  // Lógica para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const totalPages = Math.ceil(atletas.length / atletasPerPage);

  return (
    <div>
      <table className="atletas-tableAT">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ano</th>
            <th>País</th>
            <th>Posição</th>
            <th>Time</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentAtletas.map((atleta) => (
            <tr key={atleta.id}>
              <td>{atleta.nome}</td>
              <td>{atleta.ano}</td>
              <td>{atleta.nacionalidade}</td>
              <td>{atleta.posicao}</td>
              <td>{atleta.clube}</td>
              <td>{atleta.status}</td>
              <td>
                {/* Botão para visualizar */}
                <Link to={`/atletas/detalhes/${atleta.id}`} className="action-buttonAT dashboard-link">
                  <i className="bi bi-eye" title="Ver"></i>
                </Link>
                {/* Botão para editar */}
                <button className="action-buttonAT" onClick={() => handleEdit(atleta)}>
                  <i className="bi bi-pencil" title="Editar"></i>
                </button>
                {/* Botão para apagar */}
                <button className="action-buttonAT" onClick={() => handleDelete(atleta.id)}>
                  <i className="bi bi-trash" title="Apagar"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Usando o componente de Paginação */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        paginate={paginate} 
      />
    </div>
  );
}

export default TabelaAtletas;
