// src/pages/Backoffice.js

import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import WelcomeMessage from '../Components/WelcomeMessage';
import QuickActions from '../Components/QuickActions';
import Badges from '../Components/Badges';
import AthletesReportsChart from '../Components/AthletesReportsChart';
import RecentReportsTable from '../Components/RecentReportsTable'; // Importando a tabela de relatórios recentes
import '../Style/Backoffice.css';

function Backoffice() {
    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <WelcomeMessage /> {/* Usando o componente de mensagem de boas-vindas */}
                    <QuickActions /> {/* Usando o componente de ações rápidas */}
                    <Badges /> {/* Usando o componente de badges */}
                    <AthletesReportsChart /> {/* Usando o componente de gráfico */}
                    <RecentReportsTable /> {/* Usando o componente de tabela de relatórios recentes */}
                </div>
            </div>
        </div>
    );
}

export default Backoffice;
