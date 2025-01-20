// src/Components/WelcomeMessage.js

import React from 'react';
import '../Style/Backoffice.css'; // Certifique-se de que os estilos estão aplicados corretamente

const WelcomeMessage = () => {
    return (
        <div className="welcome-message">
            <h1>Bem-vindo(a) ao Backoffice</h1>
            <p>Aqui pode gerir as suas atividades, visualizar relatórios e aceder às configurações da sua conta.</p>
        </div>
    );
};

export default WelcomeMessage;