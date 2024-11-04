// src/Components/Sidebar.js

import React, { useState } from 'react';
import '../Style/Sidebar.css';
import AcadLogo from '../img/AcadLogo.png';

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
                    <a href="#">Atletas</a>
                </li>
                <li>
                    <i className="bi bi-file-earmark-text"></i>
                    <a href="#">Relatórios</a>
                </li>
                <li>
                    <i className="bi bi-people"></i>
                    <a href="#">Equipas</a>
                </li>
                <li>
                    <i className="bi bi-person-circle"></i>
                    <a href="#">Utilizadores</a>
                </li>
                <li onClick={toggleAdminDropdown} className="dropdown-toggle">
                    <i className="bi bi-tools"></i>
                    Administração
                    <span className="arrow">{isAdminOpen ? '▲' : '▼'}</span>
                </li>
                {isAdminOpen && (
                    <ul className="dropdown-menu">
                        <li>
                            <i className="bi bi-check-circle"></i>
                            <a href="#">Validações</a>
                        </li>
                    </ul>
                )}
            </ul>
            <div className="footer">
                <a href="#">
                    <i className="bi bi-shield-lock"></i>
                    Políticas de Privacidade
                </a>
                <a href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;
