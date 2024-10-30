// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/Home'; // Importa a nova página Home
import Auth from './View/Auth'; // Importa a página de login (Auth)
import SignUp from './View/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial (Home) */}
        <Route path="/login" element={<Auth />} /> {/* Página de login */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
