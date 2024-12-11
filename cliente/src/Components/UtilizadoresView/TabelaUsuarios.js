import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação

// Componente da Tabela de Usuários
function TabelaUsuarios({ usuarios, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Número de usuários por página

  // Calcular os usuários a serem exibidos na página atual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(usuarios.length / usersPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> {/* Contêiner da tabela */}
      {/* Tabela com dados dos usuários */}
      <table className="usuarios-tableAAT">
        <thead>
          <tr>
            <th>Data de Criação</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ultima Edição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((usuario) => (
              <tr key={usuario.id}>
                <td>{new Date(usuario.createdAt).toLocaleDateString()}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.role}</td>
                <td>{new Date(usuario.updatedAt).toLocaleDateString()}</td>
                <td>
                  {/* Botão para visualizar */}
                  <Link to={`/utilizadores/detalhes/${usuario.id}`} className="action-buttonAAT dashboard-link">
                    <i className="bi bi-eye" title="Ver"></i>
                  </Link>

                  {/* Botão para editar */}
                  <button
                    className="action-buttonAAT"
                    onClick={() => handleEdit(usuario)}
                  >
                    <i className="bi bi-pencil" title="Editar"></i>
                  </button>

                  {/* Botão para apagar */}
                  <button
                    className="action-buttonAAT"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    <i className="bi bi-trash" title="Apagar"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="loading-messageAAT">Carregando usuários...</td>
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

export default TabelaUsuarios;
