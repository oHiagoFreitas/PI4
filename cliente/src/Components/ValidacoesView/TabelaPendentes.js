import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../../Style/UsuariosTable.css';
import Pagination from '../Pagination';
import FiltroCategoria from '../FiltroCategoria';

function TabelaPendentes() {
  const [pendentes, setPendentes] = useState({
    atletas: [],
    relatorios: [],
    times: [],
    utilizadores: [],
  });

  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pendentesPerPage = 5;

  // Carregar os dados de pendentes
  const carregarPendentes = () => {
    axios
      .get('https://pi4-hdnd.onrender.com/pendentes/pendentes')
      .then((response) => setPendentes(response.data))
      .catch((error) => console.error('Erro ao carregar pendentes:', error));
  };

  useEffect(() => {
    carregarPendentes(); // Chama a função para carregar os pendentes ao inicializar
  }, []);

  const aprovar = (id, categoria) => {
    const baseURL = `https://pi4-hdnd.onrender.com`;
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
          text: `Aprovado com sucesso.`,
          confirmButtonText: 'Ok',
        });
        carregarPendentes(); // Recarrega os pendentes após aprovação
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao aprovar',
          text: `Erro ao aprovar ${categoria}.`,
          confirmButtonText: 'Ok',
        });
      });
  };

  const rejeitar = (id, categoria) => {
    const baseURL = `https://pi4-hdnd.onrender.com`;
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
          text: `foi rejeitado com sucesso.`,
          confirmButtonText: 'Ok',
        });
        carregarPendentes(); // Recarrega os pendentes após rejeição
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao rejeitar.',
          text: `Erro ao rejeitar ${categoria}.`,
          confirmButtonText: 'Ok',
        });
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filtrarPendentesPorCategoria = () => {
    if (categoriaFiltro === '') {
      return pendentes;
    }

    return {
      atletas: categoriaFiltro === 'Atleta' ? pendentes.atletas : [],
      relatorios: categoriaFiltro === 'Relatório' ? pendentes.relatorios : [],
      times: categoriaFiltro === 'Time' ? pendentes.times : [],
      utilizadores: categoriaFiltro === 'Utilizador' ? pendentes.utilizadores : [],
    };
  };

  const pendentesFiltrados = filtrarPendentesPorCategoria();

  const indexOfLastItem = currentPage * pendentesPerPage;
  const indexOfFirstItem = indexOfLastItem - pendentesPerPage;
  const currentAtletas = pendentesFiltrados.atletas.slice(indexOfFirstItem, indexOfLastItem);
  const currentRelatorios = pendentesFiltrados.relatorios.slice(indexOfFirstItem, indexOfLastItem);
  const currentTimes = pendentesFiltrados.times.slice(indexOfFirstItem, indexOfLastItem);
  const currentUtilizadores = pendentesFiltrados.utilizadores.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (pendentesFiltrados.atletas.length +
      pendentesFiltrados.relatorios.length +
      pendentesFiltrados.times.length +
      pendentesFiltrados.utilizadores.length) / pendentesPerPage
  );

  return (
    <div className="usuarios-table-containerAAT">
      <FiltroCategoria
        categoriaFiltro={categoriaFiltro}
        setCategoriaFiltro={setCategoriaFiltro}
      />

      <table className="usuarios-tableAAT table table-striped">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Nome/Rating Final</th>
            <th>Descrição</th>
            <th>Data de Solicitação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentAtletas.length > 0 &&
            currentAtletas.map((atleta) => (
              <tr key={atleta.id}>
                <td>Atleta</td>
                <td>{atleta.nome}</td>
                <td>Solicitação de Aprovação de novo atleta</td>
                <td>{new Date(atleta.updatedAt).toLocaleDateString()}</td>
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
          {currentRelatorios.length > 0 &&
            currentRelatorios.map((relatorio) => (
              <tr key={relatorio.id}>
                <td>Relatório</td>
                <td>{relatorio.ratingFinal}</td>
                <td>Solicitação de Aprovação de novo Relatório</td>
                <td>{new Date(relatorio.updatedAt).toLocaleDateString()}</td>
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
          {currentTimes.length > 0 &&
            currentTimes.map((time) => (
              <tr key={time.id}>
                <td>Clube</td>
                <td>{time.nome}</td>
                <td>Solicitação de Aprovação de novo Clube</td>
                <td>{new Date(time.updatedAt).toLocaleDateString()}</td>
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
          {currentUtilizadores.length > 0 &&
            currentUtilizadores.map((utilizador) => (
              <tr key={utilizador.id}>
                <td>Utilizador</td>
                <td>{utilizador.nome}</td>
                <td>
                  {utilizador.status === 'pendente'
                    ? 'Pedido de Aprovação de conta'
                    : 'Pedido de troca de Senha'}
                </td>
                <td>{new Date(utilizador.updatedAt).toLocaleDateString()}</td>
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
                    <i
                      className="bi bi-eye"
                      title="Ver"
                      style={{ cursor: 'pointer', color: 'Blue', marginRight: '10px' }}
                    />
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default TabelaPendentes;
