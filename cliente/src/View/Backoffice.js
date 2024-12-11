import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import WelcomeMessage from '../Components/WelcomeMessage';
import QuickActions from '../Components/QuickActions';
import Badges from '../Components/Badges';
import AthletesReportsChart from '../Components/AthletesReportsChart';
import RecentReportsTable from '../Components/RecentReportsTable';

import '../Style/Backoffice.css';

function Backoffice() {

    // useEffect para verificar o scoutId no localStorage
    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        console.log('Scout ID no localStorage:', scoutId); // Log para verificar o valor de scoutId
    }, []);

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
                    <RecentReportsTable /> {/* Usando o componente de tabela de relatórios */}
                </div>
            </div>
        </div>
    );
}

export default Backoffice;
