import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx'; // Biblioteca para exportar para Excel
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AthletesReportsChart = () => {
    const chartRef = useRef();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const reportsResponse = await axios.get('https://localhost:3000/relatorios');
            const relatorios = reportsResponse.data;

            const athletesResponse = await axios.get('https://localhost:3000/atletas');
            const atletas = athletesResponse.data;

            const reportsSubmitted = new Array(12).fill(0);
            const athletesCount = new Array(12).fill(0);

            relatorios.forEach(relatorio => {
                const month = new Date(relatorio.createdAt).getMonth();
                reportsSubmitted[month] += 1;
            });

            atletas.forEach(atleta => {
                const month = new Date(atleta.createdAt).getMonth();
                athletesCount[month] += 1;
            });

            setData({
                labels: [
                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ],
                datasets: [
                    {
                        label: 'Atletas Criados',
                        data: athletesCount,
                        backgroundColor: 'rgba(255, 165, 0, 0.6)',
                        borderColor: 'rgba(255, 165, 0, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Relatórios Submetidos',
                        data: reportsSubmitted,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return <div>Carregando gráficos...</div>;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Atletas Criados, Relatórios Submetidos e Atletas Totais por Mês',
            },
        },
    };

    const exportToPDF = () => {
        if (chartRef.current) {
            const imgData = chartRef.current.toBase64Image();

            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
            pdf.save('chart.pdf');
        } else {
            console.error("Gráfico não está disponível para captura.");
        }
    };

    const exportToExcel = () => {
        const headers = ['Mês', 'Atletas Criados', 'Relatórios Submetidos'];
        const rows = data.labels.map((month, index) => [
            month,
            data.datasets[0].data[index],
            data.datasets[1].data[index],
        ]);

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');

        XLSX.writeFile(workbook, 'RelatórioAtletas.xlsx');
    };

    return (
        <div className="athletes-reports">
            <Bar
                ref={chartRef}
                data={data}
                options={options}
                onReady={(chart) => (chartRef.current = chart)}
            />
            <div style={{ marginTop: '10px' }}>
                <i
                    className="bi bi-file-earmark-arrow-down"
                    style={iconStyle}
                    onClick={exportToPDF}
                    title="Exportar para PDF"
                ></i>
                <i
                    className="bi bi-file-earmark-excel"
                    style={{ ...iconStyle, marginLeft: '10px', color: 'green' }}
                    onClick={exportToExcel}
                    title="Exportar para Excel"
                ></i>
            </div>
        </div>
    );
};

const iconStyle = {
    fontSize: '24px',
    cursor: 'pointer',
};

export default AthletesReportsChart;
