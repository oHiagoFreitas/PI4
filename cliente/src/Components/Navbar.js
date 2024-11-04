// src/Components/Navbar.js

import React from 'react';
import '../Style/Navbar.css'; // Certifique-se de criar um arquivo CSS para a Navbar

function Navbar() {
    return (
        <nav className="navbar">
            <div className="user-info">
                <i className="bi bi-bell notification-icon"></i> {/* Ícone de notificação */}
                <i className="bi bi-person user-icon"></i> {/* Ícone de usuário */}
            </div>
        </nav>
    );
}

export default Navbar;
