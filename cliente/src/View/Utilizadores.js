import React, { useEffect, useState  } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import UtilizadoresTitle from '../Components/UtilizadoresView/UtilizadoresTitle'; // Mantém o nome correto
import UtilizadoresTable from '../Components/UtilizadoresView/UsuarioTable'; // Mantém o nome correto



function Utilizadores() {

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
                    <UtilizadoresTitle /> {/* Exibe o título ou subtítulo */}
                    {/* Componente de Tabela com Relatórios */}
                    <UtilizadoresTable /> {/* Exibe o título ou subtítulo */}
                    
                </div>
            </div>
        </div>
    );
}

export default Utilizadores;
