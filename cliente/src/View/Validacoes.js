// src/View/Atletas.js

import React, { useEffect, useState  } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import ValidacoesTitle from '../Components/ValidacoesView/ValidacoesTitle'; // Importando a tabela de atletas
import ValidacoesTable from '../Components/ValidacoesView/ValidacoesTable'; // Importando a tabela de atletas

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
                    <ValidacoesTitle /> {/* Exibe a tabela de atletas */}
                    <ValidacoesTable />
                    
                </div>
            </div>
        </div>
    );
}

export default Atletas;
