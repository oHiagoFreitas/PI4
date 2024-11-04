import React, { useState } from 'react';
import CreateAthleteModal from './CreateAthleteModal';
import CreateUserModal from './CreateUserModal';
import CreateTeamModal from './CreateTeamModal';
import CreateReportModal from './CreateReportModal'; // Importando o modal para criar relatórios
import '../Style/Backoffice.css';

const Badges = () => {
    const [athleteModalIsOpen, setAthleteModalIsOpen] = useState(false);
    const [userModalIsOpen, setUserModalIsOpen] = useState(false);
    const [teamModalIsOpen, setTeamModalIsOpen] = useState(false);
    const [reportModalIsOpen, setReportModalIsOpen] = useState(false); // Estado para o modal de relatório

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

                <div className="badge" onClick={openUserModal}>
                    <span className="badge-icon">+</span>
                    Criar Utilizador
                </div>
                <CreateUserModal isOpen={userModalIsOpen} onRequestClose={closeUserModal} />

                <div className="badge" onClick={openTeamModal}>
                    <span className="badge-icon">+</span>
                    Criar Time
                </div>
                <CreateTeamModal isOpen={teamModalIsOpen} onRequestClose={closeTeamModal} />

                <div className="badge" onClick={openReportModal}>
                    <span className="badge-icon">+</span>
                    Criar Relatório
                </div>
                <CreateReportModal isOpen={reportModalIsOpen} onRequestClose={closeReportModal} />
            </div>
        </div>
    );
};

export default Badges;
