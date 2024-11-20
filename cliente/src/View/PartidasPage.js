// src/View/Atletas.js

import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import PartidasTitle from '../Components/PartidasPage/PartidasTitle';
import PartidasTable from '../Components/PartidasPage/PartidasTable'; // Tabela de relatórios

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
                    <PartidasTitle /> {/* Exibe a tabela de atletas */}
                    <PartidasTable /> {/* Exibe a tabela de atletas */}
                    
                </div>
            </div>
        </div>
    );
}

export default Atletas;
