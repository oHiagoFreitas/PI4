import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CreateAthleteModal from './CreateAthleteModal';
import CreateUserModal from './CreateUserModaal';
import CreateTeamModal from './CreateTeamModal';
import CreateReportModal from './CreateReportModal'; // Importando o modal para criar relatórios
import '../Style/Backoffice.css';
import '../Style/DashBoard.css';

import Dados from '../Components/Dados';

const Badges = () => {
    const [athleteModalIsOpen, setAthleteModalIsOpen] = useState(false);
    const [userModalIsOpen, setUserModalIsOpen] = useState(false);
    const [teamModalIsOpen, setTeamModalIsOpen] = useState(false);
    const [reportModalIsOpen, setReportModalIsOpen] = useState(false); // Estado para o modal de relatório

    const [totalAtletas, setTotalAtletas] = useState(0); // Estado para total de atletas
    const [totalTimes, setTotalTimes] = useState(0); // Estado para total de times
    const [totalRelatorios, setTotalRelatorios] = useState(0); // Estado para total de relatórios
    const [TotalAtletas5, setTotalAtletas5] = useState(0); // Estado para total de atletas com nota 5

    useEffect(() => {
        // Funções para buscar os totais de atletas, times, relatórios e atletas nota 5
        const fetchTotalAtletas = async () => {
            try {
                const response = await fetch('https://localhost:3000/atletas/total-atletas');
                const data = await response.json();
                setTotalAtletas(data.totalAtletas);
            } catch (error) {
                console.error('Erro ao buscar total de atletas:', error);
            }
        };

        const fetchTotalTimes = async () => {
            try {
                const response = await fetch('https://localhost:3000/Times/total-times');
                const data = await response.json();
                setTotalTimes(data.totalTimes);
            } catch (error) {
                console.error('Erro ao buscar total de times:', error);
            }
        };

        const fetchTotalRelatorios = async () => {
            try {
                const response = await fetch('https://localhost:3000/Relatorios/total-relatorios');
                const data = await response.json();
                setTotalRelatorios(data.totalRelatorios);
            } catch (error) {
                console.error('Erro ao buscar total de relatórios:', error);
            }
        };

        const fetchTotalAtletas5 = async () => {
            try {
                const response = await fetch('https://localhost:3000/Relatorios/total-relatorios-rating5');
                const data = await response.json();
                console.log("Resposta da API:", data); // Veja toda a resposta da API
        
                // Verifique a estrutura dos dados para acessar a propriedade corretamente
                setTotalAtletas5(data.TotalAtletas5 || data.totalRelatoriosRating5 || 0); // Ajuste conforme a estrutura correta
            } catch (error) {
                console.error('Erro ao buscar total de atletas nota 5:', error);
            }
        };

        // Chama as funções de fetch
        fetchTotalAtletas();
        fetchTotalTimes();
        fetchTotalRelatorios();
        fetchTotalAtletas5();
    }, []); // O array vazio [] significa que essas funções serão chamadas apenas uma vez ao montar o componente

    useEffect(() => {
        console.log("Total Atletas Nota 5:", TotalAtletas5);
    }, [TotalAtletas5]);

    // Funções para abrir e fechar os modais
    const openAthleteModal = () => setAthleteModalIsOpen(true);
    const closeAthleteModal = () => setAthleteModalIsOpen(false);

    const openUserModal = () => setUserModalIsOpen(true);
    const closeUserModal = () => setUserModalIsOpen(false);

    const openTeamModal = () => setTeamModalIsOpen(true);
    const closeTeamModal = () => setTeamModalIsOpen(false);

    const openReportModal = () => setReportModalIsOpen(true); // Abre o modal de relatório
    const closeReportModal = () => setReportModalIsOpen(false); // Fecha o modal de relatório

    return (
        <div className="badges-section">
            <div className="badges-container">
                <div className="badge" onClick={openAthleteModal}>
                    <span className="badge-icon">+</span>
                    Criar Atleta
                </div>
                <CreateAthleteModal isOpen={athleteModalIsOpen} onRequestClose={closeAthleteModal} />

                {/* Exibe o botão de "Criar Utilizador" apenas para Admins */}
                {localStorage.getItem('userRole') === 'Admin' && (
                    <div className="badge" onClick={openUserModal}>
                        <span className="badge-icon">+</span>
                        Criar Utilizador
                    </div>
                )}
                <CreateUserModal isOpen={userModalIsOpen} onRequestClose={closeUserModal} />

                <div className="badge" onClick={openTeamModal}>
                    <span className="badge-icon">+</span>
                    Criar Clube
                </div>
                <CreateTeamModal isOpen={teamModalIsOpen} onRequestClose={closeTeamModal} />

                <div className="badge" onClick={openReportModal}>
                    <span className="badge-icon">+</span>
                    Criar Relatório
                </div>
                <CreateReportModal isOpen={reportModalIsOpen} onRequestClose={closeReportModal} />
            </div>
            <Dados></Dados>
            <div className="badgees-section">
                <div className="badgees-container">
                    <div className="badgee">
                        <div className="badgee-header">Total de Atletas</div>
                        <div className="badgee-number">{totalAtletas}</div>
                    </div>

                    <div className="badgee">
                        <div className="badgee-header">Atletas Nota 5</div>
                        <div className="badgee-number">{TotalAtletas5}</div> {/* Exibe o total de atletas com nota 5 */}
                    </div>

                    <div className="badgee">
                        <div className="badgee-header">Total De Clubes</div>
                        <div className="badgee-number">{totalTimes}</div>
                    </div>

                    <div className="badgee">
                        <div className="badgee-header">Total de Relatórios</div>
                        <div className="badgee-number">{totalRelatorios}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Badges;
