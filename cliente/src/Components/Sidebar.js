// src/Components/Sidebar.js

import React, { useState } from 'react';
import '../Style/Sidebar.css';

function Sidebar() {
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const toggleAdminDropdown = () => {
        setIsAdminOpen(!isAdminOpen);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Backoffice</h2>
            </div>
            <div className="dashboard">
                <i className="bi bi-house-fill dashboard-icon"></i> {/* Ícone de dashboard */}
                <span className="dashboard-label">Dashboard</span>
                <span className="badge">!</span>
            </div>
            <hr className="divider" />
            <ul>
                <li>
                    <i className="bi bi-person"></i> {/* Ícone de Atletas */}
                    <a href="#">Atletas</a>
                </li>
                <li>
                    <i className="bi bi-file-earmark-text"></i> {/* Ícone de Relatórios */}
                    <a href="#">Relatórios</a>
                </li>
                <li>
                    <i className="bi bi-people"></i> {/* Ícone de Equipas */}
                    <a href="#">Equipas</a>
                </li>
                <li>
                    <i className="bi bi-person-circle"></i> {/* Ícone de Utilizadores */}
                    <a href="#">Utilizadores</a>
                </li>
                <li onClick={toggleAdminDropdown} className="dropdown-toggle">
                    <i className="bi bi-tools"></i> {/* Ícone de Administração */}
                    Administração
                    <span className="arrow">{isAdminOpen ? '▲' : '▼'}</span>
                </li>
                {isAdminOpen && (
                    <ul className="dropdown-menu">
                        <li>
                            <i className="bi bi-check-circle"></i> {/* Ícone de Validações */}
                            <a href="#">Validações</a>
                        </li>
                    </ul>
                )}
            </ul>
            <div className="footer">
                <a href="#">
                    <i className="bi bi-shield-lock"></i> {/* Ícone de Políticas de Privacidade */}
                    Políticas de Privacidade
                </a>
                <a href="#">
                    <i className="bi bi-box-arrow-right"></i> {/* Ícone de Logout */}
                    Logout
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;
