// src/Components/Sidebar.js

import React, { useState } from 'react';
import '../../Style/Sidebar.css';
import AcadLogo from '../../img/AcadLogo.png';

function Sidebar() {
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const toggleAdminDropdown = () => {
        setIsAdminOpen(!isAdminOpen);
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
                    <a href="/AtletasConsultor">Atletas</a>
                </li>
                <li>
                    <i className="bi bi-file-earmark-text"></i>
                    <a href="/RelatorioConsultor">Relatórios</a>
                </li>
                <li>
                    <i className="bi bi-person-circle"></i>
                    <a href="#">Utilizadores</a>
                </li>
            </ul>
            <div className="footer">
                <a href="#">
                    <i className="bi bi-shield-lock"></i>
                    Políticas de Privacidade
                </a>
                <a href="/login">
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;
