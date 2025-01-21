import React, { useState, useEffect } from 'react';
import '../Style/microsite.css';

import { Carousel } from 'react-bootstrap'; // Importando o componente Carousel do React Bootstrap

import logo from '../assets/logo.png';
import inicio from '../assets/inicio.png';
import login from '../assets/login.png';
import criarAtleta from '../assets/criar_atleta.png';
import criarRelatorio from '../assets/criar_relatorio.png';

const App = () => {
  const [microsite, setMicrosite] = useState(null);

  useEffect(() => {
    // Função para buscar o microsite
    const fetchMicrosite = async () => {
      try {
        const response = await fetch('https://frontpi4.onrender.com/MicroSite/1'); // Troque '1' pelo ID correto do microsite no banco
        const data = await response.json();
        setMicrosite(data);
      } catch (error) {
        console.error('Erro ao buscar microsite:', error);
      }
    };

    fetchMicrosite();
  }, []);

  if (!microsite) {
    return <div>Loading...</div>; // Exibe um carregando enquanto os dados não são carregados
  }

  return (
    <div>
      <header className="ms-hero text-center">
        <div className="ms-contentor">
          <a className="navbar-brand ms-5" href="#">
            <img className="ms-logo" src={logo} alt="Logo" height="45" />
          </a>
          <p className="ms-text-start ms-nome">{microsite.mensagem}</p>
          <h1 className="ms-text-start ms-titulo">{microsite.titulo}</h1>
          <a href="/" className="btn ms-btn-dark">Acesso Backoffice</a>
          <a href="https://drive.google.com/uc?export=download&id=1IcqSbJwp0LMQ7jJe11wuaMC-YMqwemTP" className="btn ms-btn-dark1">Download App Mobile</a>
          <img className="ms-inicio-img" src={inicio} alt="Inicio" />
        </div>
      </header>

      <div className="ms-detalhes">
        <span className="ms-frase left">Classificação de Talentos</span>
        <span className="ms-frase center">Consulta Personalizada</span>
        <span className="ms-frase right">Equipa Personalizada</span>
      </div>




      <div className="ms-middle-section">
        <img src={login} className="ms-mobile-image" alt="Login" />
        <div className="ms-login-info">
          <h3>Login</h3>
          <p>A página de login é o ponto de acesso ao sistema, garantindo segurança e privacidade aos scouts.</p>
          <p>Com um design simples e funcional, permite um acesso rápido, bastando introduzir as credenciais.</p>
        </div>
      </div>



      <div className="ms-middle-section">
        <img src={criarAtleta} className="ms-mobile-image" alt="Criar Atleta" />
        <div className="ms-login-info">
          <h3>Criar Atleta</h3>
          <p>Crie novos atletas de forma rápida e eficiente.</p>
          <p>A interface simplificada permite adicionar todas as informações relevantes.</p>
          <p>Este processo eficiente garante que, em poucos cliques, os atletas ficam disponíveis para consulta.</p>
        </div>
      </div>



      <div className="ms-middle-section">
        <img src={criarRelatorio} className="ms-mobile-image" alt="Criar Relatório" />
        <div className="ms-login-info">
          <h3>Criar Relatório</h3>
          <p>A página de criação de relatórios foi desenhada para registrar o desempenho dos atletas.</p>
          <p>Inclui campos personalizados para avaliações, observações e métricas chave, com uma experiência fluida.</p>
          <p>Além disso, os relatórios podem ser exportados em formatos como Excel ou PDF, facilitando a partilha.</p>
        </div>
      </div>



      <div className="ms-info">
        <div className="ms-logo-container">
          <img src={logo} alt="Logo" className="ms-logo-img" />
          <p className="ms-text-center ms-texto-info">Cada jovem talento é uma promessa. A nossa missão? Transformá-la em realidade!</p>
        </div>
      </div>

      <footer className="ms-footer">
        <div className="ms-fim-esquerda">
          <p>Faça já o download</p>
          <a href="/" className="btn ms-btn-dark2">Backoffice</a>
          <a href="https://drive.google.com/uc?export=download&id=16nORhcn6V-SeuoxUfgTO9cq7zWoyhNfu" className="btn ms-btn-dark3">App Mobile</a>
        </div>

        <div className="ms-fim-direita">
          <a href="PoliticasPrivacidade" className="ms-privacidade" target="_blank" rel="noopener noreferrer">
            Políticas de Privacidade
          </a>
          <div className="ms-redes-sociais">
            <p>Redes Sociais</p>
            <div className="ms-icons">
              <a href="https://www.instagram.com/academicodeviseufc/" target="_blank" className="text-white me-2">
                <i className="bi bi-instagram fs-3 ms-social-icon"></i>
              </a>
              <a href="https://www.facebook.com/AcademicodeViseu/?locale=pt_PT" target="_blank" className="text-white me-2">
                <i className="bi bi-facebook fs-3 ms-social-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
