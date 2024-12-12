// src/Components/Navbar.js

import React from 'react';
import '../Style/Navbar.css'; // Certifique-se de criar um arquivo CSS para a Navbar

function Navbar() {
    return (
        <nav className="navbarp">
            <div className="user-infop">
                <i className="bi bi-bell notification-iconp"></i> {/* Ícone de notificação */}
                <i className="bi bi-person user-iconp"></i> {/* Ícone de usuário */}
            </div>
        </nav>
    );
}

export default Navbar;
