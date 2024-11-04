// src/pages/Backoffice.js

import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/Backoffice.css'; // Adicione um arquivo CSS para estilos específicos do Backoffice

function Backoffice() {
    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
            </div>
        </div>
    );
}

export default Backoffice;
