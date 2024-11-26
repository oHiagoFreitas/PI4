import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando o SweetAlert2
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importando os ícones do Bootstrap
import FiltroCategoria from '../FiltroCategoria'; // Importando o componente FiltroCategoria
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela

// Componente da Tabela de Pendentes
function TabelaPendentes() {
  const [pendentes, setPendentes] = useState({
    atletas: [],
    relatorios: [],
    times: [],
    utilizadores: [],
  });
  
  const [categoriaFiltro, setCategoriaFiltro] = useState(''); // Estado para o filtro de categoria

  // Carregar os dados de pendentes
  useEffect(() => {
    axios
      .get('http://localhost:3000/pendentes/pendentes') // Rota de pendentes
      .then((response) => setPendentes(response.data))
      .catch((error) => console.error('Erro ao carregar pendentes:', error));
  }, []);

  // Função de Aprovação
  const aprovar = (id, categoria) => {
    let url = '';
    if (categoria === 'Utilizador') {
      url = `http://localhost:3000/utilizadores/${id}/aprovar`;
    } else if (categoria === 'Atleta') {
      url = `http://localhost:3000/atletas/${id}/aprovar`;
    } else if (categoria === 'Time') {
      url = `http://localhost:3000/times/${id}/aprovar`;
    } else if (categoria === 'Relatório') {
      url = `http://localhost:3000/relatorios/${id}/aprovar`;
    }

    axios
      .put(url)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: `${categoria} aprovado com sucesso!`,
          text: `ID: ${id} foi aprovado.`,
          confirmButtonText: 'Ok',
        });
      })
      .catch((error) => {
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
    let url = '';
    if (categoria === 'Utilizador') {
      url = `http://localhost:3000/utilizadores/${id}/rejeitar`;
    } else if (categoria === 'Atleta') {
      url = `http://localhost:3000/atletas/${id}/rejeitar`;
    } else if (categoria === 'Time') {
      url = `http://localhost:3000/times/${id}/rejeitar`;
    } else if (categoria === 'Relatório') {
      url = `http://localhost:3000/relatorios/${id}/rejeitar`;
    }

    axios
      .put(url)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: `${categoria} rejeitado com sucesso!`,
          text: `ID: ${id} foi rejeitado.`,
          confirmButtonText: 'Ok',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao rejeitar',
          text: `Erro ao rejeitar ${categoria} com ID: ${id}`,
          confirmButtonText: 'Ok',
        });
      });
  };

  // Função de Visualização
  const visualizar = (id, categoria) => {
    Swal.fire({
      icon: 'info',
      title: `Visualizando ${categoria}`,
      text: `Exibindo detalhes de ${categoria} com ID: ${id}`,
      confirmButtonText: 'Ok',
    });
  };

  // Função para mudar o filtro de categoria
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

  return (
    <div className="usuarios-table-containerAAT"> {/* Contêiner da tabela */}
      
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
            <th>Nome</th>
            <th>Status</th>
            <th>Data de Solicitação</th>
            <th>Ações</th> {/* Adicionando coluna de ações */}
          </tr>
        </thead>
        <tbody>
          {/* Exibindo os Atletas Pendentes */}
          {pendentesFiltrados.atletas.length > 0 && pendentesFiltrados.atletas.map((atleta) => (
            <tr key={atleta.id}>
              <td>Atleta</td>
              <td>{atleta.nome}</td>
              <td>{atleta.status}</td>
              <td>{new Date(atleta.createdAt).toLocaleDateString()}</td>
              <td>
                <i 
                  className="bi bi-check-circle" 
                  onClick={() => aprovar(atleta.id, 'Atleta')} 
                  style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                <i 
                  className="bi bi-eye" 
                  onClick={() => visualizar(atleta.id, 'Atleta')} 
                  style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} />
                <i 
                  className="bi bi-x-circle" 
                  onClick={() => rejeitar(atleta.id, 'Atleta')} 
                  style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
          
          {/* Exibindo os Relatórios Pendentes */}
          {pendentesFiltrados.relatorios.length > 0 && pendentesFiltrados.relatorios.map((relatorio) => (
            <tr key={relatorio.id}>
              <td>Relatório</td>
              <td>{relatorio.tecnica}</td>
              <td>{relatorio.status}</td>
              <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
              <td>
                <i 
                  className="bi bi-check-circle" 
                  onClick={() => aprovar(relatorio.id, 'Relatório')} 
                  style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                <i 
                  className="bi bi-eye" 
                  onClick={() => visualizar(relatorio.id, 'Relatório')} 
                  style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} />
                <i 
                  className="bi bi-x-circle" 
                  onClick={() => rejeitar(relatorio.id, 'Relatório')} 
                  style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
          
          {/* Exibindo os Times Pendentes */}
          {pendentesFiltrados.times.length > 0 && pendentesFiltrados.times.map((time) => (
            <tr key={time.id}>
              <td>Time</td>
              <td>{time.nome}</td>
              <td>{time.status}</td>
              <td>{new Date(time.createdAt).toLocaleDateString()}</td>
              <td>
                <i 
                  className="bi bi-check-circle" 
                  onClick={() => aprovar(time.id, 'Time')} 
                  style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                <i 
                  className="bi bi-eye" 
                  onClick={() => visualizar(time.id, 'Time')} 
                  style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} />
                <i 
                  className="bi bi-x-circle" 
                  onClick={() => rejeitar(time.id, 'Time')} 
                  style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
          
          {/* Exibindo os Utilizadores Pendentes */}
          {pendentesFiltrados.utilizadores.length > 0 && pendentesFiltrados.utilizadores.map((utilizador) => (
            <tr key={utilizador.id}>
              <td>Utilizador</td>
              <td>{utilizador.nome}</td>
              <td>{utilizador.status}</td>
              <td>{new Date(utilizador.createdAt).toLocaleDateString()}</td>
              <td>
                <i 
                  className="bi bi-check-circle" 
                  onClick={() => aprovar(utilizador.id, 'Utilizador')} 
                  style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                <i 
                  className="bi bi-eye" 
                  onClick={() => visualizar(utilizador.id, 'Utilizador')} 
                  style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} />
                <i 
                  className="bi bi-x-circle" 
                  onClick={() => rejeitar(utilizador.id, 'Utilizador')} 
                  style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}

          {/* Caso não haja dados */}
          {(pendentesFiltrados.atletas.length === 0 &&
            pendentesFiltrados.relatorios.length === 0 &&
            pendentesFiltrados.times.length === 0 &&
            pendentesFiltrados.utilizadores.length === 0) && (
            <tr>
              <td colSpan="5" className="loading-messageAAT">
                Nenhum item pendente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaPendentes;
