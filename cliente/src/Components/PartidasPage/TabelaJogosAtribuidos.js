import React from 'react';
import '../../Style/AtletasView/TabelaJogosAtribuidos.css'; // Importando o arquivo de estilo
import axios from 'axios'; // Importando o axios para fazer a requisição HTTP
import Swal from 'sweetalert2'; // SweetAlert para exibir mensagens amigáveis

function TabelaJogosAtribuidos({ jogosAtribuidos, atualizarJogos }) {

  // Função para remover o scout de uma partida
  const removerScout = async (partidaId, scoutId) => {
    try {
      // Realiza a requisição DELETE para remover o scout da partida
      const response = await axios.delete(`http://localhost:3000/partidas/${partidaId}/scouts/${scoutId}`);

      // Verificar se a resposta foi bem-sucedida
      if (response.status === 200) {
        // Exibe um alerta de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Partida Removida',
          text: 'Você não é mais o Scout dessa partida',
        });

        // Forçar a atualização da página após a remoção
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erro ao remover scout:', error);
      // Exibe um alerta de erro se algo der errado
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
    <table className="tabela-jogos-atribuidos">
      <thead>
        <tr>
          <th>Data</th>
          <th>Hora</th>
          <th>Local</th>
          <th>Time Mandante</th>
          <th>Time Visitante</th>
          <th>Jogadores</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {jogosAtribuidos.map((jogo) => (
          <tr key={jogo.id}>
            <td>{new Date(jogo.data).toLocaleDateString()}</td>
            <td>{new Date(`1970-01-01T${jogo.hora}Z`).toLocaleTimeString()}</td>
            <td>{jogo.local}</td>
            <td>{jogo.timeMandante?.nome}</td>
            <td>{jogo.timeVisitante?.nome || 'N/A'}</td>

            {/* Exibe os nomes dos jogadores */}
            <td>
              {jogo.jogadores?.map((jogador) => (
                <div key={jogador.id} className="nome-jogador">{jogador.nome}</div>
              ))}
            </td>

            {/* Coluna de Ações */}
            <td style={{ textAlign: 'center' }}>
              {jogo.scouts?.map((scout) => (
                <button
                  key={scout.id}
                  onClick={() => removerScout(jogo.id, scout.id)} // Chama a função para remover o scout
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
                  <i className="bi bi-x"></i> {/* Ícone de "X" */}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaJogosAtribuidos;
