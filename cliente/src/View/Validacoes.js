// src/View/Atletas.js

import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import ValidacoesTitle from '../Components/ValidacoesView/ValidacoesTitle'; // Importando a tabela de atletas
import ValidacoesTable from '../Components/ValidacoesView/ValidacoesTable'; // Importando a tabela de atletas

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
                    <ValidacoesTitle /> {/* Exibe a tabela de atletas */}
                    <ValidacoesTable />
                    
                </div>
            </div>
        </div>
    );
}

export default Atletas;
