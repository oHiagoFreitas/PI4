import React, { useEffect , useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css';
import PartidasTitle from '../Components/PartidasPage/PartidasTitle'; // Título da seção de partidas
import PartidasTable from '../Components/PartidasPage/PartidasTable'; // Tabela de partidas

function PartidasPage() {

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
                    <PartidasTitle /> {/* Título da página de partidas */}
                    <PartidasTable /> {/* Tabela de partidas */}
                </div>
            </div>
        </div>
    );
}

export default PartidasPage;
