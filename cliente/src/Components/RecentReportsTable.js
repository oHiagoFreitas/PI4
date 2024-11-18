// src/Components/RecentReportsTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importando axios para fazer requisições HTTP
import '../Style/Backoffice.css'; // Certifique-se de que os estilos estão aplicados corretamente

const RecentReportsTable = () => {
    const [reports, setReports] = useState([]); // Estado para armazenar os relatórios
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Função para buscar os relatórios da API
    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:3000/relatorios/pendentes'); // Ajuste o URL conforme necessário
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
        return <div>Carregando...</div>; // Mensagem de carregamento
    }

    return (
        <div className="recent-reports">
            <h2>Relatórios Recentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentReportsTable;
