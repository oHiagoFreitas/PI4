// src/View/Atletas.js

import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import TimeTitle from '../Components/TimeView/TimeTitle'; // Importando a tabela de atletas
import TimeTable from '../Components/TimeView/TimeTable'; // Importando a tabela de atletas

function Atletas() {

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        console.log('Scout ID no localStorage:', scoutId);
        // Você pode usar scoutId aqui para filtrar ou mostrar dados específicos
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <TimeTitle /> {/* Exibe a tabela de atletas */}
                    <TimeTable />
                    
                </div>
            </div>
        </div>
    );
}

export default Atletas;
