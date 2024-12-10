import React, { useState, useEffect } from 'react';
import '../../Style/AtletasView/AtletasTable.css'; // Estilo da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionar
import axios from 'axios'; // Biblioteca para requisições HTTP

// Componente da Tabela de Partidas
function TabelaPartidas({ partidas, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignedScouts, setAssignedScouts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const scoutId = localStorage.getItem('userId');
    console.log('Scout ID no localStorage:', scoutId);
    // Inicializando os scouts atribuídos a partir do localStorage
    setAssignedScouts(prev => ({
      ...prev,
      [scoutId]: []
    }));
  }, []);

  // Calcular as partidas a serem exibidas na página atual
  const indexOfLastMatch = currentPage * 5; // Limite de 5 partidas por página
  const indexOfFirstMatch = indexOfLastMatch - 5;
  const currentMatches = partidas.slice(indexOfFirstMatch, indexOfLastMatch);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(partidas.length / 5);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para atribuir scout
  const handleAssignScout = async (id) => {
    try {
      const scoutId = localStorage.getItem('userId');
      const scoutsIds = assignedScouts[id] || [];
      console.log('IDs de scouts a serem atribuídos:', scoutsIds);
  
      // Inclui o ID do scout obtido do localStorage na lista de IDs de scouts
      scoutsIds.push(scoutId);
  
      const response = await axios.put(`http://localhost:3000/partidas/${id}/atribuir-scout`, { scoutsIds });
      
      console.log('Resposta da atribuição de scouts:', response.data);
  
      // Atualizar o estado para refletir a atribuição
      setAssignedScouts(prev => ({
        ...prev,
        [id]: [...scoutsIds]
      }));
    } catch (error) {
      console.error('Erro ao atribuir scout:', error);
    }
  };
  

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

                {/* Ações de editar, excluir e atribuir */}
                <td>
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
