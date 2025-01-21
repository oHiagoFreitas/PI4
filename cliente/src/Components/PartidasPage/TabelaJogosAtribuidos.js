import React, { useState } from 'react';
import '../../Style/AtletasView/TabelaJogosAtribuidos.css'; // Importando o arquivo de estilo
import axios from 'axios'; // Importando o axios para fazer a requisição HTTP
import Swal from 'sweetalert2'; // SweetAlert para exibir mensagens amigáveis
import Pagination from '../Pagination'; // Importando o componente de paginação

function TabelaJogosAtribuidos({ jogosAtribuidos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de itens por página

  // Calcular as partidas a serem exibidas na página atual
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = jogosAtribuidos.slice(indexOfFirstMatch, indexOfLastMatch);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(jogosAtribuidos.length / itemsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para remover o scout de uma partida
  const removerScout = async (partidaId, scoutId) => {
    try {
      const response = await axios.delete(`https://pi4-hdnd.onrender.com/partidas/${partidaId}/scouts/${scoutId}`);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Partida Removida',
          text: 'Você não é mais o Scout dessa partida',
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao tentar remover o scout.',
      });
    }
  };

  if (jogosAtribuidos.length === 0) {
    return <p className="mensagem-sem-jogos">Você não tem jogos atribuídos.</p>;
  }

  return (
    <div>
      <table className="tabela-jogos-atribuidos">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Local</th>
            <th>Equipa do Atleta</th>
            <th>Equipa Visitante</th>
            <th>Jogadores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentMatches.map((jogo) => (
            <tr key={jogo.id}>
              <td>{new Date(jogo.data).toLocaleDateString()}</td>
              <td>{new Date(`1970-01-01T${jogo.hora}Z`).toLocaleTimeString()}</td>
              <td>{jogo.local}</td>
              <td>{jogo.timeMandante?.nome}</td>
              <td>{jogo.timeVisitante?.nome || 'N/A'}</td>
              <td>
                {jogo.jogadores?.map((jogador) => (
                  <div key={jogador.id} className="nome-jogador">{jogador.nome}</div>
                ))}
              </td>
              <td style={{ textAlign: 'center' }}>
                {jogo.scouts?.map((scout) => (
                  <button
                    key={scout.id}
                    onClick={() => removerScout(jogo.id, scout.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      color: 'red',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                    title="Remover Scout"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination-container">
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default TabelaJogosAtribuidos;
