// src/View/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Home.css'; // Importando o CSS para estilização

import AcadLogo from '../img/AcadLogo.png';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Direciona para a página de login
    };

    return (
        <div className="home-container">
            {/* Logo do time */}
            <img
                src={AcadLogo}
                alt="Logo do time"
                className="logo"
            />

            {/* Mensagem de boas-vindas */}
            <h1 className="welcome-message">Bem Vindo!</h1>

            {/* Mensagem menor */}
            <h3 className="sub-message">Onde o potencial encontra a oportunidade</h3>

            {/* Botão de login */}
            <button className="login-button" onClick={handleLoginClick}>
                Faça seu Login
            </button>
        </div>
    );
};

export default Home;
