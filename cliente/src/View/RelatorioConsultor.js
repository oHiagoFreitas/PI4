import React, { useEffect } from 'react';
import Sidebar2 from '../Components/BackofficeConsultor/SideBar2';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import RelatorioTitle from '../Components/RelatorioView/RelatorioTitle'; // Mantém o nome correto
import RelatoriosTable2 from '../Components/BackofficeConsultor/RelatorioView/RelatoriosTable2'; // Tabela de relatórios


function Relatorio() {

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        console.log('Scout ID no localStorage:', scoutId);
        // Você pode usar scoutId aqui para filtrar ou mostrar dados específicos
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar2 />
            <div className="main-content">
                <Navbar />
                <div className='sub-main-content'>
                    <RelatorioTitle /> {/* Exibe o título ou subtítulo */}
                    {/* Componente de Tabela com Relatórios */}
                    <RelatoriosTable2 />
                </div>
            </div>
        </div>
    );
}

export default Relatorio;
