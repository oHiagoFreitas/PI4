import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import Pagination from '../Pagination'; // Importando o componente de paginação
import EditTeamModal from './EditTeamModal'; // Importando o modal de edição


// Componente da Tabela de Times
function TabelaTimes({ times, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userRole, setUserRole] = useState(null); // Estado para armazenar a role do usuário

  const timesPerPage = 10; // Número de times por página

  // Função para calcular os times da página atual
  const indexOfLastTime = currentPage * timesPerPage;
  const indexOfFirstTime = indexOfLastTime - timesPerPage;
  const currentTimes = times.slice(indexOfFirstTime, indexOfLastTime);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(times.length / timesPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para abrir o modal com o time selecionado
  const openEditModal = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  // Função para fechar o modal e recarregar a página
  const closeEditModal = (refresh = false) => {
   
    setIsModalOpen(false);
    setSelectedTeam(null);
    if (refresh) {
      useNavigate("/times"); // Redireciona para a página "/times" sem recarregar
    }
};

  // Carregar a role do usuário do localStorage
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role); // Atualiza o estado
  }, []);

  return (
    <div> {/* Contêiner da tabela */}
      {/* Tabela com dados dos times */}
      <table className="atletas-tableAT" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Clube</th>
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

                  {/* Botões de edição e exclusão apenas para Admins */}
                  {userRole === 'Admin' && (
                    <>
                      {/* Botão para editar */}
                      <button
                        className="action-buttonAT"
                        onClick={() => openEditModal(time)} // Abrir modal ao clicar
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
                    </>
                  )}
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

      {/* Modal de Edição */}
      {selectedTeam && (
        <EditTeamModal
          isOpen={isModalOpen}
          onRequestClose={() => closeEditModal(true)} // Fecha modal e recarrega a página
          teamData={selectedTeam}
        />
      )}
    </div>
  );
}

export default TabelaTimes;
