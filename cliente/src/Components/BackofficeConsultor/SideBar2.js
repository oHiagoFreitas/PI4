// src/Components/Sidebar.js
import React, { useState } from 'react';
import '../../Style/Sidebar.css';
import AcadLogo from '../../img/AcadLogo.png';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link para navegação

function Sidebar() {
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const navigate = useNavigate();

    const toggleAdminDropdown = () => {
        setIsAdminOpen(!isAdminOpen);
    };

    const handleLogout = () => {
        console.log('Antes do clear:', localStorage);
        localStorage.clear();
        console.log('Depois do clear:', localStorage);
        navigate('/login');
    };


    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={AcadLogo} alt="Acad Logo" className="sidebar-logo" />
            </div>
            <div className="dashboard">
                <span className="dashboard-label badge">
                    <i className="bi bi-house-fill dashboard-icon"></i> {/* Ícone de dashboard */}
                    Dashboard
                </span>
            </div>
            <hr className="divider" />
            <ul>
                <li>
                    <i className="bi bi-person"></i>
                    < Link to="/AtletasConsultor">Atletas</Link>
                </li>
                <li>
                    <i className="bi bi-file-earmark-text"></i>
                    <Link to="/RelatorioConsultor">Relatórios</Link>
                </li>
                <li>
                    <i className="bi bi-window"></i>
                    <Link to="/MicroSite">Web Page</Link>
                </li>
            </ul>
            <div className="footer">
                <Link to="/PoliticasPrivacidade">

                    <i className="bi bi-shield-lock"></i>

                    Políticas de Privacidade
                </Link>
                <Link to="/login" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;
