import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import axios from 'axios';  // Usando axios para fazer a requisição à API

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AthletesReportsChart = () => {
    const chartRef = useRef(); // Referência para o gráfico
    const [data, setData] = useState(null);  // Armazenando os dados do gráfico

    // Função para pegar os dados da API
    const fetchData = async () => {
        try {
            // Requisição para pegar os relatórios
            const reportsResponse = await axios.get('http://localhost:3000/relatorios');
            const relatorios = reportsResponse.data;

            // Requisição para pegar os atletas
            const athletesResponse = await axios.get('http://localhost:3000/atletas');
            const atletas = athletesResponse.data;

            // Organizar os dados para o gráfico
            const reportsSubmitted = new Array(12).fill(0);  // Inicializa um array para os relatórios
            const athletesCount = new Array(12).fill(0); // Inicializa um array para o número de atletas

            // Organizar os dados dos relatórios
            relatorios.forEach(relatorio => {
                const month = new Date(relatorio.createdAt).getMonth();  // Obtém o mês da data de criação
                athletesCount[month] += 1;  // Incrementa os atletas criados
                reportsSubmitted[month] += 1;  // Incrementa os relatórios enviados
            });

            // Organizar os dados dos atletas
            atletas.forEach(atleta => {
                const month = new Date(atleta.createdAt).getMonth();  // Obtém o mês da data de criação do atleta
                athletesCount[month] += 1; // Incrementa o número de atletas por mês
            });

            // Define os dados do gráfico
            setData({
                labels: [
                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ],
                datasets: [
                    {
                        label: 'Atletas Criados',
                        data: athletesCount,
                        backgroundColor: 'rgba(255, 165, 0, 0.6)', // Laranja
                        borderColor: 'rgba(255, 165, 0, 1)', // Laranja
                        borderWidth: 1,
                    },
                    {
                        label: 'Relatórios Submetidos',
                        data: reportsSubmitted,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Preto
                        borderColor: 'rgba(0, 0, 0, 1)', // Preto
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Chama a função fetchData assim que o componente for montado
    useEffect(() => {
        fetchData();
    }, []);

    // Verifica se os dados estão prontos
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
