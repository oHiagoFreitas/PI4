// src/pages/Backoffice.js

import React from 'react';
import Sidebar2 from '../Components/BackofficeConsultor/SideBar2';
import Navbar from '../Components/Navbar';
import WelcomeMessage from '../Components/WelcomeMessage';

import AthletesReportsChart from '../Components/AthletesReportsChart';

import '../Style/Backoffice.css';

function Backoffice() {
    
    return (
        <div className="backoffice-container">
            <Sidebar2 />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <WelcomeMessage /> {/* Usando o componente de mensagem de boas-vindas */}
                    <AthletesReportsChart /> {/* Usando o componente de gráfico */}   
                </div>
            </div>
        </div>
    );
}

export default Backoffice;
