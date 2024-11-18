// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/Home';
import Auth from './View/Auth';
import SignUp from './View/SignUp';
import Atletas from './View/Atletas'; // Importando o componente de Atletas
import Backoffice from './View/Backoffice';
import BackofficeConsultor from './View/backofficeConsultor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/atletas" element={<Atletas />} /> {/* Rota para a página de Atletas */}
        <Route path="/backofficeConsultor" element={<BackofficeConsultor />} />
      </Routes>
    </Router>
  );
};

export default App;
