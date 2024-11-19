import React from 'react';
import { Link } from 'react-router-dom'; // Adicione esta linha para importar Link

function TabelaAtletas({ atletas, handleEdit, handleDelete }) {
  return (
    <table className="atletas-tableAT">
      <thead>
        <tr>
          <th>Nome</th>
          <th>País</th>
          <th>Posição</th>
          <th>Time</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {atletas.map((atleta) => (
          <tr key={atleta.id}>
            <td>{atleta.nome}</td>
            <td>{atleta.nacionalidade}</td>
            <td>{atleta.posicao}</td>
            <td>{atleta.clube}</td>
            <td>{atleta.status}</td>
            <td>
              {/* Botão para visualizar */}
              <Link to={`/atletas/detalhes/${atleta.id}`} className="action-buttonAT dashboard-link">
                <i className="bi bi-eye" title="Ver"></i>
              </Link>
              {/* Botão para editar */}
              <button className="action-buttonAT" onClick={() => handleEdit(atleta)}>
                <i className="bi bi-pencil" title="Editar"></i>
              </button>
              {/* Botão para apagar */}
              <button className="action-buttonAT" onClick={() => handleDelete(atleta.id)}>
                <i className="bi bi-trash" title="Apagar"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaAtletas;
