import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import WelcomeMessage from '../Components/WelcomeMessage';
import QuickActions from '../Components/QuickActions';
import Badges from '../Components/Badges';
import AthletesReportsChart from '../Components/AthletesReportsChart';
import RecentReportsTable from '../Components/RecentReportsTable';

import '../Style/Backoffice.css';

function Backoffice() {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);

        setUserRole(role); // Atualiza o estado
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar userRole={userRole} /> {/* Passa userRole para Sidebar */}
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <WelcomeMessage />
                    <QuickActions />
                    <Badges />
                    <AthletesReportsChart />
                    <RecentReportsTable />
                </div>
            </div>
        </div>
    );
}

export default Backoffice;
