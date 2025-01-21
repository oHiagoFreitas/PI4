import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando SweetAlert
import Pagination from './Pagination';
import '../Style/RecentReportsTable.css';

const RecentReportsTable = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    const fetchReports = async () => {
        try {
            const response = await axios.get('https://pi4-hdnd.onrender.com/relatorios/pendentes');
            setReports(response.data);
        } catch (error) {
            console.error('Erro ao buscar relatórios:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja aprovar este relatório?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, aprovar!'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`https://pi4-hdnd.onrender.com/relatorios/${id}/aprovar`);
                Swal.fire('Aprovado!', 'O relatório foi aprovado com sucesso.', 'success');
                fetchReports();
            } catch (error) {
                console.error('Erro ao aprovar relatório:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao aprovar o relatório.', 'error');
            }
        }
    };

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja rejeitar este relatório?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, rejeitar!'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`https://pi4-hdnd.onrender.com/relatorios/${id}/rejeitar`);
                Swal.fire('Rejeitado!', 'O relatório foi rejeitado com sucesso.', 'success');
                fetchReports();
            } catch (error) {
                console.error('Erro ao rejeitar relatório:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao rejeitar o relatório.', 'error');
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Carregando...</div>;
    }

    const sortedReports = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                            <td>{new Date(report.createdAt).toLocaleString()}</td>
                            <td>{report.atleta ? report.atleta.nome : 'Atleta não encontrado'}</td>
                            <td>{report.utilizador ? report.utilizador.nome : 'Scout não encontrado'}</td>
                            <td>{report.ratingFinal}</td>
                            <td className="actions-buttons">
                                <button 
                                    className="button-approve" 
                                    onClick={() => handleApprove(report.id)}
                                >
                                    Aprovar
                                </button>
                                <button 
                                    className="button-reject" 
                                    onClick={() => handleReject(report.id)}
                                >
                                    Rejeitar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                paginate={paginate} 
            />
        </div>
    );
};

export default RecentReportsTable;
