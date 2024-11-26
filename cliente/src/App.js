import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/Home';
import Auth from './View/Auth';
import SignUp from './View/SignUp';
import Atletas from './View/Atletas';
import Relatorio from './View/Relatorio';
import Backoffice from './View/Backoffice';
import BackofficeConsultor from './View/backofficeConsultor';
import DetalhesAtleta from './Components/AtletasView/DetalhesAtleta';
import RelatorioDetalhes from "./Components/RelatorioView/RelatorioDetalhes";
import Utilizadores from './View/Utilizadores';
import PartidasPage from './View/PartidasPage'; // Página de Partidas
import CriarPartida from './Components/PartidasPage/CriarPartida';
import Time from './View/Time';
import Validacoes from './View/Validacoes';
import UtilizadorDetalhe from "./Components/ValidacoesView/DetalhesUtilizador";
import DetalhesTime from "./Components/TimeView/DetalhesTime";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/atletas" element={<Atletas />} />
        <Route path="/atletas/detalhes/:id" element={<DetalhesAtleta />} />
        <Route path="/backofficeConsultor" element={<BackofficeConsultor />} />
        <Route path="/Relatorios" element={<Relatorio />} />
        <Route path="/relatorios/detalhes/:id" element={<RelatorioDetalhes />} />
        <Route path="/Utilizadores" element={<Utilizadores />} />
        <Route path="/partidas" element={<PartidasPage />} /> {/* Página de Partidas */}
        <Route path="/criar-partida" element={<CriarPartida />} />
        <Route path="/times" element={<Time />} />´
        <Route path="/Validacoes" element={<Validacoes />} />
        <Route path="/utilizadores/detalhes/:id" element={<UtilizadorDetalhe />} />
        <Route path="/times/detalhes/:id" element={<DetalhesTime />} />

        
      </Routes>
    </Router>
  );
};

export default App;
