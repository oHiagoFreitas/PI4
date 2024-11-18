import React from "react";

function HistoricoRelatorios({ relatorios }) {
  return (
    <div className="historico-relatoriosAD">
      <h2 className="headerAD">Histórico de Relatórios</h2>
      <table className="tableAD">
        <thead>
          <tr>
            <th>Data de criação</th>
            <th>Utilizador</th>
            <th>Rating</th>
            <th>Comentários adicionais</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {relatorios.length > 0 ? (
            relatorios.map((relatorio, index) => (
              <tr key={index}>
                <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
                <td>{relatorio.utilizador || "Não disponível"}</td>
                <td>{relatorio.ratingFinal}</td>
                <td>{relatorio.comentario}</td>
                <td><button>Ver</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum relatório encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricoRelatorios;
