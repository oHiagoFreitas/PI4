import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adicionando Link para navegação
import Pagination from '../../Pagination'; // Importando o componente Pagination


function TabelaAtletas({ atletas, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [atletasData, setAtletasData] = useState(atletas); // Estado para armazenar os atletas
  const atletasPerPage = 5; // Quantidade de atletas por página

  // Lógica para determinar os atletas da página atual
  const indexOfLastAtleta = currentPage * atletasPerPage;
  const indexOfFirstAtleta = indexOfLastAtleta - atletasPerPage;
  const currentAtletas = atletasData.slice(indexOfFirstAtleta, indexOfLastAtleta);

  // Lógica para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const totalPages = Math.ceil(atletasData.length / atletasPerPage);

  // Atualiza os atletas sempre que a lista mudar
  useEffect(() => {
    setAtletasData(atletas); // Atualiza os dados quando os atletas mudam
  }, [atletas]);

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
              <td>{atleta.time ? atleta.time.nome : atleta.clube}</td> {/* Nome do time aqui */}
              <td>{atleta.status}</td>
              <td>
                {/* Botão para visualizar */}
                <Link to={`/atletas/detalhes/${atleta.id}`} className="action-buttonAT dashboard-link">
                  <i className="bi bi-eye" title="Ver"></i>
                </Link>
                {/* Botão para editar */}
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
