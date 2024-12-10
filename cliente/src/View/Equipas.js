// src/View/Atletas.js

import React, { useEffect , useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import EquipasSelector from '../Components/EquipasView/EquipasSelector'; // Importando o seletor de equipas
import '../Style/Modal.css';
import '../Style/Backoffice.css';

import '../Style/Backoffice.css';
import EquipasTitle from '../Components/EquipasView/EquipasTitle'; // Importando a tabela de atletas

function Atletas() {

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
            <Sidebar userRole={userRole}/>
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
