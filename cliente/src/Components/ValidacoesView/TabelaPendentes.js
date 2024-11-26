import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando o SweetAlert2
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importando os ícones do Bootstrap
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela
import Pagination from '../Pagination'; // Importando o componente de Paginação
import FiltroCategoria from '../FiltroCategoria'; // Importando o componente FiltroCategoria

// Componente da Tabela de Pendentes
function TabelaPendentes() {
  const [pendentes, setPendentes] = useState({
    atletas: [],
    relatorios: [],
    times: [],
    utilizadores: [],
  });

  const [categoriaFiltro, setCategoriaFiltro] = useState(''); // Estado para o filtro de categoria
  const [currentPage, setCurrentPage] = useState(1); // Estado de controle de paginação
  const pendentesPerPage = 5; // Número de pendentes por página

  // Carregar os dados de pendentes
  useEffect(() => {
    axios
      .get('http://localhost:3000/pendentes/pendentes') // Rota de pendentes
      .then((response) => setPendentes(response.data))
      .catch((error) => console.error('Erro ao carregar pendentes:', error));
  }, []);

  // Função de Aprovação
  const aprovar = (id, categoria) => {
    const baseURL = `http://localhost:3000`;
    const endpoints = {
      Utilizador: `/utilizadores/${id}/aprovar`,
      Atleta: `/atletas/${id}/aprovar`,
      Time: `/times/${id}/aprovar`,
      Relatório: `/relatorios/${id}/aprovar`,
    };

    const url = baseURL + (endpoints[categoria] || '');

    axios
      .put(url)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `${categoria} aprovado com sucesso!`,
          text: `ID: ${id} foi aprovado.`,
          confirmButtonText: 'Ok',
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao aprovar',
          text: `Erro ao aprovar ${categoria} com ID: ${id}`,
          confirmButtonText: 'Ok',
        });
      });
  };

  // Função de Rejeição
  const rejeitar = (id, categoria) => {
    const baseURL = `http://localhost:3000`;
    const endpoints = {
      Utilizador: `/utilizadores/${id}/rejeitar`,
      Atleta: `/atletas/${id}/rejeitar`,
      Time: `/times/${id}/rejeitar`,
      Relatório: `/relatorios/${id}/rejeitar`,
    };

    const url = baseURL + (endpoints[categoria] || '');

    axios
      .put(url)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `${categoria} rejeitado com sucesso!`,
          text: `ID: ${id} foi rejeitado.`,
          confirmButtonText: 'Ok',
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao rejeitar',
          text: `Erro ao rejeitar ${categoria} com ID: ${id}`,
          confirmButtonText: 'Ok',
        });
      });
  };

  // Função de paginação
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para filtrar pendentes por categoria
  const filtrarPendentesPorCategoria = () => {
    if (categoriaFiltro === '') {
      return pendentes; // Se nenhum filtro for selecionado, retorna todos os pendentes
    }

    // Filtra os pendentes pela categoria escolhida
    return {
      atletas: categoriaFiltro === 'Atleta' ? pendentes.atletas : [],
      relatorios: categoriaFiltro === 'Relatório' ? pendentes.relatorios : [],
      times: categoriaFiltro === 'Time' ? pendentes.times : [],
      utilizadores: categoriaFiltro === 'Utilizador' ? pendentes.utilizadores : [],
    };
  };

  // Obter os dados filtrados
  const pendentesFiltrados = filtrarPendentesPorCategoria();

  // Calcular os pendentes da página atual
  const indexOfLastItem = currentPage * pendentesPerPage;
  const indexOfFirstItem = indexOfLastItem - pendentesPerPage;
  const currentAtletas = pendentesFiltrados.atletas.slice(indexOfFirstItem, indexOfLastItem);
  const currentRelatorios = pendentesFiltrados.relatorios.slice(indexOfFirstItem, indexOfLastItem);
  const currentTimes = pendentesFiltrados.times.slice(indexOfFirstItem, indexOfLastItem);
  const currentUtilizadores = pendentesFiltrados.utilizadores.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(
    (pendentesFiltrados.atletas.length +
      pendentesFiltrados.relatorios.length +
      pendentesFiltrados.times.length +
      pendentesFiltrados.utilizadores.length) / pendentesPerPage
  );

  return (
    <div className="usuarios-table-containerAAT">
      {/* Filtro de Categoria */}
      <FiltroCategoria
        categoriaFiltro={categoriaFiltro}
        setCategoriaFiltro={setCategoriaFiltro}
      />

      {/* Tabela com dados dos pendentes */}
      <table className="usuarios-tableAAT table table-striped">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Nome/Rating Final</th>
            <th>Status</th>
            <th>Data de Solicitação</th>
            <th>Ações</th> {/* Adicionando coluna de ações */}
          </tr>
        </thead>
        <tbody>
          {/* Exibindo os Atletas Pendentes */}
          {currentAtletas.length > 0 &&
            currentAtletas.map((atleta) => (
              <tr key={atleta.id}>
                <td>Atleta</td>
                <td>{atleta.nome}</td>
                <td>{atleta.status}</td>
                <td>{new Date(atleta.createdAt).toLocaleDateString()}</td>
                <td>
                  <i
                    className="bi bi-check-circle"
                    onClick={() => aprovar(atleta.id, 'Atleta')}
                    style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                  />
                  <Link
                    to={`/atletas/detalhes/${atleta.id}`}
                    className="action-buttonAT dashboard-link"
                  >
                    <i className="bi bi-eye" title="Ver" style={{ cursor: 'pointer', color: 'Blue', marginRight: '10px' }}></i>
                  </Link>
                  <i
                    className="bi bi-x-circle"
                    onClick={() => rejeitar(atleta.id, 'Atleta')}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}

          {/* Exibindo os Relatórios Pendentes */}
          {currentRelatorios.length > 0 &&
            currentRelatorios.map((relatorio) => (
              <tr key={relatorio.id}>
                <td>Relatório</td>
                <td>{relatorio.ratingFinal}</td>
                <td>{relatorio.status}</td>
                <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
                <td>
                  <i
                    className="bi bi-check-circle"
                    onClick={() => aprovar(relatorio.id, 'Relatório')}
                    style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                  />
                  <Link
                    to={`/relatorios/detalhes/${relatorio.id}`}
                    className="action-buttonAT dashboard-link"
                  >
                    <i className="bi bi-eye" title="Ver" style={{ cursor: 'pointer', color: 'Blue', marginRight: '10px' }}></i>
                  </Link>
                  <i
                    className="bi bi-x-circle"
                    onClick={() => rejeitar(relatorio.id, 'Relatório')}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}

          {/* Exibindo os Times Pendentes */}
          {currentTimes.length > 0 &&
            currentTimes.map((time) => (
              <tr key={time.id}>
                <td>Time</td>
                <td>{time.nome}</td>
                <td>{time.status}</td>
                <td>{new Date(time.createdAt).toLocaleDateString()}</td>
                <td>
                  <i
                    className="bi bi-check-circle"
                    onClick={() => aprovar(time.id, 'Time')}
                    style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                  />
                  <Link
                    to={`/times/detalhes/${time.id}`}
                    className="action-buttonAT dashboard-link"
                  >
                    <i className="bi bi-eye" title="Ver" style={{ cursor: 'pointer', color: 'Blue', marginRight: '10px' }}></i>
                  </Link>
                  <i
                    className="bi bi-x-circle"
                    onClick={() => rejeitar(time.id, 'Time')}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}

          {/* Exibindo os Utilizadores Pendentes */}
          {currentUtilizadores.length > 0 &&
            currentUtilizadores.map((utilizador) => (
              <tr key={utilizador.id}>
                <td>Utilizador</td>
                <td>{utilizador.nome}</td>
                <td>{utilizador.status}</td>
                <td>{new Date(utilizador.createdAt).toLocaleDateString()}</td>
                <td>
                  <i
                    className="bi bi-check-circle"
                    onClick={() => aprovar(utilizador.id, 'Utilizador')}
                    style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                  />
                  <Link
                    to={`/utilizadores/detalhes/${utilizador.id}`}
                    className="action-buttonAT dashboard-link"
                  >
                    <i className="bi bi-eye" title="Ver" style={{ cursor: 'pointer', color: 'Blue', marginRight: '10px' }}></i>
                  </Link>
                  <i
                    className="bi bi-x-circle"
                    onClick={() => rejeitar(utilizador.id, 'Utilizador')}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Exibindo a Paginação */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default TabelaPendentes;
