import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adicionando Link para navegação
import Pagination from '../Pagination'; // Importando o componente Pagination
import axios from 'axios'; // Para realizar requisições HTTP

function TabelaAtletas({ atletas, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [atletasData, setAtletasData] = useState(atletas); // Estado para armazenar os atletas
  const atletasPerPage = 10; // Quantidade de atletas por página

  const [userRole, setUserRole] = useState(null);
    
  useEffect(() => {
    const scoutId = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    console.log('Scout ID no localStorage:', scoutId);
    console.log('Role do utilizador no localStorage:', role);

    setUserRole(role); // Atualiza o estado
  }, []);

  // Lógica para determinar os atletas da página atual
  const indexOfLastAtleta = currentPage * atletasPerPage;
  const indexOfFirstAtleta = indexOfLastAtleta - atletasPerPage;
  const currentAtletas = atletasData.slice(indexOfFirstAtleta, indexOfLastAtleta);

  // Lógica para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const totalPages = Math.ceil(atletasData.length / atletasPerPage);

  // Função para atualizar os atletas após a edição de um time
  const updateAtletas = async () => {
    try {
      const response = await axios.get('https://pi4-hdnd.onrender.com/atletas/getAllAtletasAprovados'); // Requisição para obter os atletas novamente
      setAtletasData(response.data); // Atualiza o estado com os atletas atualizados
    } catch (error) {
      console.error('Erro ao atualizar os atletas:', error);
    }
  };

  // Atualiza os atletas sempre que a lista mudar
  useEffect(() => {
    setAtletasData(atletas); // Atualiza os dados quando os atletas mudam
  }, [atletas]);

  return (
    <div>
      <table className="atletas-tableAT" style={{marginTop: 20}}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ano</th>
            <th>Nacionalidade</th>
            <th>Posição</th>
            <th>Clube</th>
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
              <td>
                {/* Botão para visualizar */}
                <Link to={`/atletas/detalhes/${atleta.id}`} className="action-buttonAT dashboard-link">
                  <i className="bi bi-eye" title="Ver"></i>
                </Link>

                {/* Botões de edição e exclusão apenas para Admins */}
                {userRole === 'Admin' && (
                  <>
                    {/* Botão para editar */}
                    <button className="action-buttonAT" onClick={() => handleEdit(atleta, updateAtletas)}>
                      <i className="bi bi-pencil" title="Editar"></i>
                    </button>

                    {/* Botão para apagar */}
                    <button className="action-buttonAT" onClick={() => handleDelete(atleta.id)}>
                      <i className="bi bi-trash" title="Apagar"></i>
                    </button>
                  </>
                )}
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
