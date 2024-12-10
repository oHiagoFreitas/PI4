import React, { useEffect , useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import RelatorioTitle from '../Components/RelatorioView/RelatorioTitle'; // Mantém o nome correto
import RelatoriosTable from '../Components/RelatorioView/RelatoriosTable'; // Tabela de relatórios


function Relatorio() {

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
                    <RelatorioTitle /> {/* Exibe o título ou subtítulo */}
                    {/* Componente de Tabela com Relatórios */}
                    <RelatoriosTable />
                </div>
            </div>
        </div>
    );
}

export default Relatorio;
