// src/View/Atletas.js

import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AtletasTable from '../Components/AtletasView/AtletasTable'; // Importando a tabela de atletas
import '../Style/Backoffice.css';
import AtletasTitle from '../Components/AtletasView/AtletasTitle'; // Importando a tabela de atletas

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
            <Sidebar userRole={userRole} />
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
