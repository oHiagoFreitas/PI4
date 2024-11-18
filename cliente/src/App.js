// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/Home'; // Importa a nova página Home
import Auth from './View/Auth'; // Importa a página de login (Auth)
import SignUp from './View/SignUp';
import Backoffice from './View/Backoffice'; // Importa a página de Backoffice
import BackofficeConsultor from './View/backofficeConsultor'; // Importa a página de Backoffice do Consultor

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial (Home) */}
        <Route path="/login" element={<Auth />} /> {/* Página de login */}
        <Route path="/signup" element={<SignUp />} /> {/* Página de cadastro */}
        <Route path="/backoffice" element={<Backoffice />} /> {/* Página de Backoffice */}
        <Route path="/backofficeConsultor" element={<BackofficeConsultor />} /> {/* Página de Backoffice do Consultor */}

        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
