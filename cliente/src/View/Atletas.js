// src/View/Atletas.js

import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AtletasTable from '../Components/AtletasView/AtletasTable'; // Importando a tabela de atletas
import '../Style/Backoffice.css';
import AtletasTitle from '../Components/AtletasView/AtletasTitle'; // Importando a tabela de atletas

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
                    <AtletasTitle /> {/* Exibe a tabela de atletas */}
                    <AtletasTable /> {/* Exibe a tabela de atletas */}
                </div>
            </div>
        </div>
    );
}

export default Atletas;
