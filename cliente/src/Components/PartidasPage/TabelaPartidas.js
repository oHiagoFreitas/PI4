// src/Components/TabelaPartidas.js

import React from 'react';
import { Link } from 'react-router-dom'; // Para navegação
import '../../Style/AtletasView/AtletasTable.css'; // Estilo da tabela

// Componente da Tabela de Partidas
function TabelaPartidas({ partidas, handleEdit, handleDelete }) {
    return (
        <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
            {/* Tabela com dados das partidas */}
            <table className="atletas-tableAT table table-striped">
                <thead>
                    <tr>
                        <th>Data e Hora</th>
                        <th>Time 1</th>
                        <th>Time 2</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.length > 0 ? (
                        partidas.map((partida) => (
                            <tr key={partida.id}>
                                <td>{new Date(partida.hora).toLocaleString()}</td> {/* Exibindo data e hora */}
                                <td>{partida.time1}</td>
                                <td>{partida.time2}</td>
                                <td>{partida.local}</td>
                                <td>
                                    {/* Botão para editar */}
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleEdit(partida)}
                                    >
                                        <i className="bi bi-pencil" title="Editar"></i>
                                    </button>

                                    {/* Botão para deletar */}
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
                            <td colSpan="5" className="loading-messageAT">Carregando partidas...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaPartidas;
