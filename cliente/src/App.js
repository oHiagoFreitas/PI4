import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/Home';
import Auth from './View/Auth';
import AuthUpdate from './View/AuthUpdate';
import SignUp from './View/SignUp';
import Atletas from './View/Atletas';
import AtletasConsultor from './View/AtletasConsultor';
import Relatorio from './View/Relatorio';
import Backoffice from './View/Backoffice';
import BackofficeConsultor from './View/backofficeConsultor';
import RelatorioConsultor from './View/RelatorioConsultor';
import DetalhesAtleta from './Components/AtletasView/DetalhesAtleta';
import DetalhesAtleta2 from './Components/BackofficeConsultor/AtletasView/DetalhesAtleta2';
import RelatorioDetalhes from "./Components/RelatorioView/RelatorioDetalhes";
import RelatorioDetalhes2 from "./Components/BackofficeConsultor/RelatorioView/RelatorioDetalhes2";
import Utilizadores from './View/Utilizadores';
import PartidasPage from './View/PartidasPage'; // Página de Partidas
import CriarPartida from './Components/PartidasPage/CriarPartida';
import Time from './View/Time';
import Validacoes from './View/Validacoes';
import UtilizadorDetalhe from "./Components/ValidacoesView/DetalhesUtilizador";
import DetalhesTime from "./Components/TimeView/DetalhesTime";
import Equipas from './View/Equipas';
import CriarEquipeComJogadores from './Components/EquipasView/CriarEquipeComJogadores';
import CriarEquipePrincipalComJogadores from './Components/EquipasView/EquipePrincipal/CriarEquipePrincipalComJogadores';
import MostrarEquipeComJogadores from './Components/EquipasView/MostrarEquipeComJogadores';
import MostrarEquipePrincipalComJogadores from './Components/EquipasView/EquipePrincipal/MostrarEquipePrincipalComJogadores';
import EditarEquipeComJogadores from "./Components/EquipasView/EditarEquipe";
import EditarEquipePrincipal from './Components/EquipasView/EquipePrincipal/EditarEquipePrincipal';
import EditarPartida from './Components/PartidasPage/EditarPartida'; // Página de edição de partida
import MicroSite from './View/MicroSite';
import PoliticasPrivacidade from './View/PoliticasPrivacidade';
import WebPage from './View/WebPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/EsqueceuPass" element={<AuthUpdate />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/atletas" element={<Atletas />} />
        <Route path="/AtletasConsultor" element={<AtletasConsultor />} />
        <Route path="/atletas/detalhes/:id" element={<DetalhesAtleta />} />
        <Route path="/atletas2/detalhes/:id" element={<DetalhesAtleta2 />} />
        <Route path="/backofficeConsultor" element={<BackofficeConsultor />} />
        <Route path="/RelatorioConsultor" element={<RelatorioConsultor />} />
        <Route path="/Relatorios" element={<Relatorio />} />
        <Route path="/relatorios/detalhes/:id" element={<RelatorioDetalhes />} />
        <Route path="/relatorios2/detalhes/:id" element={<RelatorioDetalhes2 />} />
        <Route path="/Utilizadores" element={<Utilizadores />} />
        <Route path="/partidas" element={<PartidasPage />} /> {/* Página de Partidas */}
        <Route path="/criar-partida" element={<CriarPartida />} />
        <Route path="/criar-partida/:id" element={<EditarPartida />} /> {/* Página de edição de partida */}
        <Route path="/times" element={<Time />} />
        <Route path="/Validacoes" element={<Validacoes />} />
        <Route path="/utilizadores/detalhes/:id" element={<UtilizadorDetalhe />} />
        <Route path="/times/detalhes/:id" element={<DetalhesTime />} />
        <Route path="/Equipas" element={<Equipas />} />
        <Route path="/MicroSite" element={<MicroSite />} />
        <Route path="/WebPage" element={<WebPage />} />
        <Route path="/PoliticasPrivacidade" element={<PoliticasPrivacidade />} />
        <Route path="/equipeSombra/:id" element={<CriarEquipeComJogadores />} />
        <Route path="/equipePrincipal/:id" element={<CriarEquipePrincipalComJogadores />} />
        <Route path="/MostrarequipeSombra/:id" element={<MostrarEquipeComJogadores />} />
        <Route path="/MostrarequipePrincipal/:id" element={<MostrarEquipePrincipalComJogadores />} />
        <Route path="/editar-equipe/:id" element={<EditarEquipeComJogadores />} />
        <Route path="/editar-equipePrincipal/:id" element={<EditarEquipePrincipal />} />
      </Routes>
    </Router>
  );
};

export default App;
