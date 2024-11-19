import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import UtilizadoresTitle from '../Components/UtilizadoresView/UtilizadoresTitle'; // Mantém o nome correto
import UtilizadoresTable from '../Components/UtilizadoresView/UsuarioTable'; // Mantém o nome correto



function Utilizadores() {

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
                    <UtilizadoresTitle /> {/* Exibe o título ou subtítulo */}
                    {/* Componente de Tabela com Relatórios */}
                    <UtilizadoresTable /> {/* Exibe o título ou subtítulo */}
                    
                </div>
            </div>
        </div>
    );
}

export default Utilizadores;
