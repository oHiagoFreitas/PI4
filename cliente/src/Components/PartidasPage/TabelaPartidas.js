import React, { useState, useEffect } from 'react';
import '../../Style/AtletasView/AtletasTable.css'; // Estilo da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionar
import axios from 'axios'; // Biblioteca para requisições HTTP
import Swal from 'sweetalert2';

// Componente da Tabela de Partidas
function TabelaPartidas({ partidas, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtendo o papel do usuário do localStorage
    const role = localStorage.getItem('userRole');
    console.log('Role no localStorage:', role); // Debug para conferir o papel no localStorage
    if (role) {
      setUserRole(role); // Atualiza o estado apenas se o papel estiver definido
    }
  }, []);

  // Filtrar partidas de acordo com o papel do usuário
  const filteredMatches = partidas.filter((partida) => {
    if (userRole === 'Scout') {
      // Mostrar apenas partidas que possuem o texto "Nenhum scout"
      return !partida.scouts || partida.scouts.length === 0;
    }
    // Mostrar todas as partidas para outros papéis
    return true;
  });

  // Calcular as partidas a serem exibidas na página atual
  const indexOfLastMatch = currentPage * 5; // Limite de 5 partidas por página
  const indexOfFirstMatch = indexOfLastMatch - 5;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredMatches.length / 5);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para atribuir scout
  const handleAssignScout = async (id) => {
    try {
      const scoutId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:3000/partidas/${id}/atribuir-scout`, { scoutId });

      // SweetAlert de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Scout atribuído com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao atribuir scout:', error);

      // SweetAlert de erro
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao atribuir scout!',
      });
    }
  };

  // Renderização condicional enquanto userRole não está definido
  if (userRole === null) {
    return <div>Carregando...</div>; // Exibe carregamento até que o papel seja definido
  }

  return (
    <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
      {/* Tabela com dados das partidas */}
      <table className="atletas-tableAT table table-striped">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Time 1</th>
            <th>Time 2</th>
            <th>Atletas</th>
            <th>Scouts</th>
            <th>Local</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentMatches.length > 0 ? (
            currentMatches.map((partida) => (
              <tr key={partida.id}>
                {/* Exibindo a Data */}
                <td>{new Date(partida.data).toLocaleDateString()}</td>

                {/* Exibindo a Hora */}
                <td>{new Date(`1970-01-01T${partida.hora}Z`).toLocaleTimeString()}</td>

                {/* Exibindo os Times */}
                <td>{partida.timeMandante ? partida.timeMandante.nome : 'N/A'}</td>
                <td>{partida.timeVisitante ? partida.timeVisitante.nome : 'N/A'}</td>

                {/* Exibindo os Atletas */}
                <td>
                  {partida.jogadores && partida.jogadores.length > 0
                    ? partida.jogadores.map(atleta => atleta.nome).join(', ')
                    : 'Nenhum atleta'}
                </td>

                {/* Exibindo os Scouts */}
                <td>
                  {partida.scouts && partida.scouts.length > 0
                    ? partida.scouts.map(scout => scout.nome).join(', ')
                    : 'Nenhum scout'}
                </td>

                {/* Exibindo o Local */}
                <td>{partida.local}</td>

                {/* Ações */}
                <td>
                  {/* Exibir o botão de edição apenas para Admin */}
                  {userRole === 'Admin' && (
                    <div className="action-buttons-container">
                      <button
                        className="action-buttonAT"
                        onClick={() => navigate(`/criar-partida/${partida.id}`)}
                      >
                        <i className="bi bi-pencil" title="Editar"></i>
                      </button>
                      <button
                        className="action-buttonAT"
                        onClick={() => handleDelete(partida.id)}
                      >
                        <i className="bi bi-trash" title="Deletar"></i>
                      </button>
                    </div>
                  )}

                  {/* Botão para atribuir scout */}
                  <button
                    className="action-buttonAT"
                    onClick={() => handleAssignScout(partida.id)}
                  >
                    <i className="bi bi-plus" title="Atribuir"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="loading-messageAT">Nenhuma Partida Encontrada</td>
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

export default TabelaPartidas;
