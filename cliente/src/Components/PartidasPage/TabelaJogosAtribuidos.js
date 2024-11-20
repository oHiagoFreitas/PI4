import React from 'react';
import '../../Style/AtletasView/TabelaJogosAtribuidos.css'; // Importando o arquivo de estilo

function TabelaJogosAtribuidos({ jogosAtribuidos }) {
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
          <th>Jogadores</th> {/* Coluna para os jogadores */}
          <th>Utilizadores</th> {/* Coluna para os utilizadores (scouts ou admins) */}
        </tr>
      </thead>
      <tbody>
        {jogosAtribuidos.map((jogo) => (
          <tr key={jogo.id}>
            <td>{jogo.data}</td>
            <td>{jogo.hora}</td>
            <td>{jogo.local}</td>
            <td>{jogo.timeMandante?.nome}</td>
            <td>{jogo.timeVisitante?.nome || 'N/A'}</td>

            {/* Exibe os nomes dos jogadores, caso existam */}
            <td>
              {jogo.jogadores?.map((jogador) => (
                <div key={jogador.id} className="nome-jogador">{jogador.nome}</div>
              ))}
            </td>

            {/* Exibe os nomes dos utilizadores (scouts ou admins), caso existam */}
            <td>
              {jogo.scouts?.map((utilizador) => (
                <div key={utilizador.id} className="nome-utilizador">{utilizador.nome}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaJogosAtribuidos;
