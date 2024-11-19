// src/Components/TabelaRelatorios.js

import React from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela

// Componente da Tabela de Relatórios
function TabelaRelatorios({ relatorios, handleEdit, handleDelete }) {
    return (
        <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
            {/* Tabela com dados dos relatórios */}
            <table className="atletas-tableAT table table-striped">
                <thead>
                    <tr>
                        <th>Data de Criação</th>
                        <th>Nome do Atleta</th>
                        <th>Nome do Scout</th>
                        <th>Rating</th>
                        <th>Comentario</th>

                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {relatorios.length > 0 ? (
                        relatorios.map((relatorio) => (
                            <tr key={relatorio.id}>
                                <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
                                <td>{relatorio.atleta.nome}</td> {/* Nome do Atleta */}
                                <td>{relatorio.utilizador.nome}</td> {/* Nome do Scout */}
                                <td>{relatorio.ratingFinal}</td>
                                <td>{relatorio.comentario}</td>
                                <td>
                                    {/* Botão para visualizar */}
                                    <Link to={`/atletas/detalhes/${relatorio.id}`} className="action-buttonAT dashboard-link">
                                        <i className="bi bi-eye" title="Ver"></i>
                                    </Link>

                                    {/* Botão para editar */}
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleEdit(relatorio)}
                                    >
                                        <i className="bi bi-pencil" title="Editar"></i>
                                    </button>

                                    {/* Botão para apagar */}
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleDelete(relatorio.id)}
                                    >
                                        <i className="bi bi-trash" title="Apagar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="loading-messageAT">Carregando relatórios...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaRelatorios;
