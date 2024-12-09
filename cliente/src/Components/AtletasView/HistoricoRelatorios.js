import React from "react";
import { Link } from "react-router-dom"; // Adicione esta linha para importar Link corretamente

function HistoricoRelatorios({ relatorios = [] }) {  // Define valor padrão como array vazio
    return (
        <div className="historico-relatoriosAD">
            <h2 className="headerAD" style={{ color: 'white' }}>
                Histórico de Relatórios
            </h2>
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
                        relatorios.map((relatorio, index) => {
                            console.log(relatorio);  // Verifique a estrutura real dos dados
                            return (
                                <tr key={index}>
                                    <td>{new Date(relatorio.createdAt).toLocaleDateString()}</td>
                                    <td>{relatorio.utilizador ? relatorio.utilizador.nome : relatorio.scoutId || "Não disponível"}</td>
                                    <td>{relatorio.ratingFinal}</td>
                                    <td>{relatorio.comentario}</td>
                                    <td>
                                        <Link to={`/relatorios2/detalhes/${relatorio.id}`} className="action-buttonAT dashboard-link">
                                            <i className="bi bi-eye" title="Ver"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
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
