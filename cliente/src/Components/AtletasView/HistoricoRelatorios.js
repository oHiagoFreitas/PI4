import React from "react";

function HistoricoRelatorios({ relatorios = [] }) {  // Define valor padrão como array vazio
    return (
        <div className="historico-relatoriosAD">
            <h2 className="headerAD" style={{ color: 'white' }}
            >Histórico de Relatórios</h2>
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
                                    {/* Verificar se scoutId ou o nome do utilizador está disponível */}
                                    <td>{relatorio.utilizador ? relatorio.utilizador.nome : relatorio.scoutId || "Não disponível"}</td>
                                    <td>{relatorio.ratingFinal}</td>
                                    <td>{relatorio.comentario}</td>
                                    <td><button>Ver</button></td>
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
