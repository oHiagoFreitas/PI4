// src/View/Atletas.js

import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import EquipasSelector from '../Components/EquipasView/EquipasSelector'; // Importando o seletor de equipas
import '../Style/Modal.css';
import '../Style/Backoffice.css';

import '../Style/Backoffice.css';
import EquipasTitle from '../Components/EquipasView/EquipasTitle'; // Importando a tabela de atletas

function Atletas() {

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        console.log('Scout ID no localStorage:', scoutId);
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>      
                    <EquipasTitle /> {/* Exibe a tabela de atletas */}
                    <EquipasSelector /> {/* Colocando o seletor de equipas */}
                </div>
            </div>
        </div>
    );
}

export default Atletas;
