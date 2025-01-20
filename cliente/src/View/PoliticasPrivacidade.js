import React from 'react';

import '../Style/politicas_privacidade.css';

import logo from '../assets/logo.png';
import seta from '../assets/seta.png';

const PoliticasPrivacidade = () => (
    <div>
        {/* Header */}
        <header className="pp-hero text-center">
            <div className="pp-contentor">
                <a className="navbar-brand ms-5" href="#">
                    <div className="pp-logo-container">
                        <img className="pp-logo" src={logo} alt="Logo" height="45" />
                        <a href="/MicroSite">
                            <img className="pp-seta" src={seta} alt="Seta" height="20" />
                        </a>
                    </div>
                </a>
                <p className="pp-text-start nome">Viriatos Scouting</p>
                <h1 className="pp-text-start titulo">POLÍTICAS DE PRIVACIDADE</h1>
            </div>
        </header>

        {/* Detalhes */}
        <div className="pp-detalhes">
            <div className="pp-privacidade-texto">
                <p>Esta Política de Privacidade descreve como são recolhidos, utilizados e protegidos os dados pessoais dos atletas e utilizadores que interagem com a nossa plataforma de scouting, composta por um portal de backoffice e uma aplicação móvel. O Académico de Viseu Futebol Clube compromete-se a proteger a privacidade dos atletas e dos utilizadores e a garantir que os seus dados pessoais são tratados de forma segura e responsável, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável.</p>

                <h3>1. Dados Recolhidos</h3>
                <p>São recolhidos os seguintes dados pessoais dos atletas, utilizadores e responsáveis legais através da nossa plataforma:</p>
                <ul>
                    <li><strong>Informações dos Atletas:</strong> Nome completo, data de nascimento, nacionalidade, posição no campo, clube atual, dados de desempenho (como técnica, velocidade, atitude competitiva, inteligência, altura, morfologia e rating final) e dados do encarregado de educação ou agente.</li>
                    <li><strong>Informações de Utilizadores (Scouts e Administradores):</strong> Nome, endereço de e-mail, função no sistema e dados de login.</li>
                </ul>

                <h3>2. Finalidade da Recolha de Dados</h3>
                <p>Os dados pessoais recolhidos têm como principais finalidades:</p>
                <ul>
                    <li><strong>Gestão de Atletas e Relatórios:</strong> Recolher e armazenar informações sobre os jogadores de futebol para monitorização, avaliação e análise de desempenho, facilitando o processo de scouting.</li>
                    <li><strong>Criação e Consulta de Relatórios:</strong> Permitir aos scouts introduzirem relatórios de avaliação dos atletas, bem como consultar esses relatórios por parte dos utilizadores autorizados.</li>
                </ul>

                <h3>3. Base Legal para o Tratamento de Dados</h3>
                <p>O tratamento dos dados pessoais dos atletas e utilizadores é realizado com base nas seguintes justificações legais:</p>
                <ul>
                    <li><strong>Consentimento:</strong> O consentimento explícito dos atletas ou dos seus responsáveis legais será solicitado no ato da recolha de dados.</li>
                    <li><strong>Interesse Legítimo:</strong> Tratamos os dados pessoais no contexto da gestão e desenvolvimento dos atletas com vista à prossecução das atividades de scouting do clube.</li>
                </ul>

                <h3>4. Partilha de Dados Pessoais</h3>
                <p>Os dados recolhidos poderão ser partilhados com as seguintes entidades ou pessoas:</p>
                <ul>
                    <li><strong>Entidades Legais:</strong> Poderemos partilhar dados com autoridades competentes, quando tal for exigido.</li>
                </ul>

                <h3>5. Segurança dos Dados</h3>
                <p>Adotamos várias medidas para proteger os dados pessoais contra o acesso não autorizado, a alteração, a divulgação ou a destruição. Estas medidas incluem:</p>
                <ul>
                    <li><strong>Controlo de Acessos:</strong> Implementamos um sistema de controlo de acessos com níveis diferenciados (administrador, utilizador e consulta), para garantir que apenas utilizadores autorizados acedem aos dados.</li>
                    <li><strong>Monitorização e Auditoria:</strong> Realizamos auditorias regulares ao sistema para garantir a segurança e a conformidade com o RGPD.</li>
                </ul>

                <h3>6. Direitos dos Titulares dos Dados</h3>
                <p>De acordo com o RGPD, os atletas e os seus representantes legais têm os seguintes direitos sobre os seus dados pessoais:</p>
                <ul>
                    <li><strong>Direito de Acesso:</strong> O titular dos dados tem o direito de saber quais os dados pessoais que estamos a tratar e para que finalidades.</li>
                    <li><strong>Direito de Retificação:</strong> O titular pode solicitar a correção de dados pessoais incorretos ou incompletos.</li>
                    <li><strong>Direito ao Apagamento:</strong> Pode pedir que os seus dados sejam apagados, exceto quando o tratamento é necessário para o cumprimento de obrigações legais ou para o exercício ou defesa de um direito.</li>
                    <li><strong>Direito à Limitação do Tratamento:</strong> O titular tem o direito de solicitar a limitação do tratamento dos seus dados em determinadas circunstâncias.</li>
                    <li><strong>Direito à Portabilidade dos Dados:</strong> Quando aplicável, o titular pode solicitar que os seus dados sejam fornecidos num formato estruturado, de uso comum e leitura automática.</li>
                    <li><strong>Direito de Oposição:</strong> O titular tem o direito de se opor ao tratamento dos seus dados com base em interesses legítimos.</li>
                </ul>

                <h3>7. Retenção de Dados</h3>
                <p>Os dados pessoais serão mantidos enquanto forem necessários para os fins para os quais foram recolhidos ou para cumprir obrigações legais. Quando os dados não forem mais necessários, serão eliminados de forma segura. De acordo com o projeto, o sistema garantirá que não há duplicação de dados e manterá um histórico de relatórios único por atleta.</p>

                <h3>8. Prevenção de Duplicação de Dados</h3>
                <p>O sistema de scouting implementado inclui mecanismos para evitar a duplicação de dados, garantindo que cada atleta tenha um histórico centralizado e único de observações e relatórios. Este processo inclui a criação de relatórios únicos e o bloqueio de introdução de dados duplicados no sistema.</p>

                <h3>9. Alterações à Política de Privacidade</h3>
                <p>Reservamo-nos o direito de alterar esta Política de Privacidade a qualquer momento. Quaisquer alterações significativas serão comunicadas através da nossa página web ou diretamente aos utilizadores da plataforma.</p>

                <h3>10. Contacto</h3>
                <p>Se tiver alguma dúvida sobre esta Política de Privacidade ou sobre como os seus dados são tratados, pode entrar em contacto connosco através do seguinte endereço de e-mail: [email do responsável pelo tratamento de dados].</p>
            </div>

        </div>



        {/* Info Section */}
        <div className="pp-info">
            <div className="pp-logo-container">
                <img src={logo} alt="Logo" className="pp-logo-img" style={{justifyContent: "center"}}/>
                <p className="pp-text-center texto-info">
                    Cada jovem talento é uma promessa.<br />
                    A nossa missão? Transformá-la em realidade!
                </p>
            </div>
        </div>

        {/* Footer */}
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

export default PoliticasPrivacidade;
