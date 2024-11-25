// src/Components/TabelaPartidas.js

import React from 'react';
import '../../Style/AtletasView/AtletasTable.css'; // Estilo da tabela

// Componente da Tabela de Partidas
function TabelaPartidas({ partidas, handleEdit, handleDelete }) {
    return (
        <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
            {/* Tabela com dados das partidas */}
            <table className="atletas-tableAT table table-striped">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Time 1</th>
                        <th>Time 2</th>
                        <th>Atletas</th>
                        <th>Scouts</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.length > 0 ? (
                        partidas.map((partida) => (
                            <tr key={partida.id}>
                                {/* Exibindo a Data */}
                                <td>{new Date(partida.data).toLocaleDateString()}</td>

                                {/* Exibindo a Hora */}
                                <td>{new Date(`1970-01-01T${partida.hora}Z`).toLocaleTimeString()}</td>

                                {/* Exibindo os Times */}
                                <td>{partida.timeMandante ? partida.timeMandante.nome : 'N/A'}</td>
                                <td>{partida.timeVisitante ? partida.timeVisitante.nome : 'N/A'}</td>

                                {/* Exibindo os Atletas */}
                                <td>
                                    {partida.jogadores && partida.jogadores.length > 0
                                        ? partida.jogadores.map(atleta => atleta.nome).join(', ')
                                        : 'Nenhum atleta'}
                                </td>

                                {/* Exibindo os Scouts */}
                                <td>
                                    {partida.scouts && partida.scouts.length > 0
                                        ? partida.scouts.map(scout => scout.nome).join(', ')
                                        : 'Nenhum scout'}
                                </td>

                                {/* Exibindo o Local */}
                                <td>{partida.local}</td>

                                {/* Ações de editar e excluir */}
                                <td>
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleEdit(partida)}
                                    >
                                        <i className="bi bi-pencil" title="Editar"></i>
                                    </button>

                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleDelete(partida.id)}
                                    >
                                        <i className="bi bi-trash" title="Deletar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="loading-messageAT">Nenhuma Partida Encontrada</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaPartidas;
