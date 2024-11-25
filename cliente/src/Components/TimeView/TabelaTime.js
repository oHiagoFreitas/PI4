// src/Components/TabelaTimes.js

import React from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela

// Componente da Tabela de Times
function TabelaTimes({ times, handleEdit, handleDelete }) {
    return (
        <div className="atletas-table-containerAT"> {/* Contêiner da tabela */}
            {/* Tabela com dados dos times */}
            <table className="atletas-tableAT table table-striped">
                <thead>
                    <tr>
                        <th>Nome do Time</th>
                        <th>País</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {times.length > 0 ? (
                        times.map((time) => (
                            <tr key={time.id}>
                                <td>{time.nome}</td> {/* Nome do Time */}
                                <td>{time.pais}</td> {/* Nome do Técnico */}
                                <td>{time.categoria}</td> {/* Número de Jogadores */}
                                <td>{time.descricao}</td> {/* Descrição do Time */}
                                <td>
                                    {/* Botão para visualizar */}
                                    <Link to={`/times/detalhes/${time.id}`} className="action-buttonAT dashboard-link">
                                        <i className="bi bi-eye" title="Ver"></i>
                                    </Link>

                                    {/* Botão para editar */}
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleEdit(time)}
                                    >
                                        <i className="bi bi-pencil" title="Editar"></i>
                                    </button>

                                    {/* Botão para apagar */}
                                    <button
                                        className="action-buttonAT"
                                        onClick={() => handleDelete(time.id)}
                                    >
                                        <i className="bi bi-trash" title="Apagar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="loading-message">Nenhum time encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaTimes;
