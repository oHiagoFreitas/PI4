// src/Components/RecentReportsTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importando axios para fazer requisições HTTP
import Pagination from './Pagination'; // Importando o componente de paginação
import '../Style/RecentReportsTable.css'; // Importando o arquivo CSS

const RecentReportsTable = () => {
    const [reports, setReports] = useState([]); // Estado para armazenar os relatórios
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const reportsPerPage = 5; // Número de relatórios por página

    // Função para buscar os relatórios da API
    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:3000/relatorios'); // Ajuste o URL conforme necessário
            setReports(response.data); // Armazenando os dados recebidos no estado
        } catch (error) {
            console.error('Erro ao buscar relatórios:', error);
        } finally {
            setLoading(false); // Alterando o estado de carregamento para false
        }
    };

    useEffect(() => {
        fetchReports(); // Chama a função ao montar o componente
    }, []);

    if (loading) {
        return <div className="loading-message">Carregando...</div>; // Mensagem de carregamento
    }

    // Ordenando os relatórios pela data de criação em ordem decrescente
    const sortedReports = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Calcular os relatórios a serem exibidos na página atual
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular o número total de páginas
    const totalPages = Math.ceil(sortedReports.length / reportsPerPage);

    return (
        <div className="recent-reports">
            <h2>Relatórios Recentes</h2>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Data de Criação</th>
                        <th>Nome do Atleta</th>
                        <th>Nome do Scout</th>
                        <th>Rating Final</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReports.map((report) => (
                        <tr key={report.id}>
                            <td>{new Date(report.createdAt).toLocaleString()}</td>  {/* Exibe a data formatada */}
                            <td>{report.atleta ? report.atleta.nome : 'Atleta não encontrado'}</td>  {/* Nome do Atleta */}
                            <td>{report.utilizador ? report.utilizador.nome : 'Scout não encontrado'}</td>  {/* Nome do Scout */}
                            <td>{report.ratingFinal}</td>  {/* Exibe o Rating Final */}
                            <td className="actions-buttons">
                                <button className="button-approve">Aprovar</button>  {/* Botão Aprovar */}
                                <button className="button-reject">Rejeitar</button>  {/* Botão Rejeitar */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Navegação de Paginação */}
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                paginate={paginate} 
            />
        </div>
    );
};

export default RecentReportsTable;
