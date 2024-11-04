// src/Components/AthletesReportsChart.js

import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AthletesReportsChart = () => {
    const chartRef = useRef(); // Referência para o gráfico

    // Dados do gráfico
    const data = {
        labels: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
            {
                label: 'Atletas Criados',
                data: [12, 15, 20, 25, 30, 18, 24, 22, 28, 35, 30, 40],
                backgroundColor: 'rgba(255, 165, 0, 0.6)', // Laranja
                borderColor: 'rgba(255, 165, 0, 1)', // Laranja
                borderWidth: 1,
            },
            {
                label: 'Relatórios Submetidos',
                data: [10, 12, 15, 20, 22, 25, 30, 28, 35, 40, 38, 45],
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Preto
                borderColor: 'rgba(0, 0, 0, 1)', // Preto
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Atletas Criados e Relatórios Submetidos por Mês',
            },
        },
    };

    // Função para exportar o gráfico como PDF
    const exportToPDF = () => {
        if (chartRef.current) {
            const imgData = chartRef.current.toBase64Image(); // Captura a imagem do gráfico

            const pdf = new jsPDF('landscape'); // Configura o PDF em paisagem
            pdf.addImage(imgData, 'PNG', 10, 10, 280, 150); // Adiciona a imagem ao PDF
            pdf.save('chart.pdf'); // Salva o arquivo como chart.pdf
        } else {
            console.error("Gráfico não está disponível para captura.");
        }
    };

    return (
        <div className="athletes-reports">
            <Bar 
                ref={chartRef} // Coloca a referência aqui
                data={data} 
                options={options} 
                onReady={(chart) => (chartRef.current = chart)} // Atualiza a referência quando o gráfico estiver pronto
            />
            <i 
                className="bi bi-file-earmark-arrow-down" 
                style={iconStyle} 
                onClick={exportToPDF} // Chama a função ao clicar no ícone
                title="Exportar para PDF"
            ></i>
        </div>
    );
};

// Estilos do ícone
const iconStyle = {
    marginTop: '10px',
    fontSize: '24px', // Tamanho do ícone
    color: '#f39c12', // Cor do ícone
    cursor: 'pointer', // Cursor de mão ao passar por cima
};

export default AthletesReportsChart;
