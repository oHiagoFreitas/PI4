import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para navegação
import '../Style/Sidebar.css';
import AcadLogo from '../img/AcadLogo.png';

function Sidebar({ userRole }) { // Receber a função do utilizador
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const toggleAdminDropdown = () => {
        setIsAdminOpen(!isAdminOpen);
    };

    const handleLogout = () => {
        console.log('Antes do clear:', localStorage);
        localStorage.clear();
        console.log('Depois do clear:', localStorage);
        navigate('/login'); // Ou window.location.href = '/login';
    };


    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={AcadLogo} alt="Acad Logo" className="sidebar-logo" />
            </div>
            <div className="dashboard">
                <Link to="/backoffice" className="dashboard-link"> {/* Link para Backoffice */}
                    <span className="dashboard-label badge">
                        <i className="bi bi-house-fill dashboard-icon"></i> {/* Ícone de dashboard */}
                        Dashboard
                    </span>
                </Link>
            </div>
            <hr className="divider" />
            <ul>
                <li>
                    <i className="bi bi-calendar-event"></i>
                    <Link to="/partidas">Jogos</Link> {/* Link para a página de Partidas */}
                </li>
                <li>
                    <i className="bi bi-trophy"></i>
                    <Link to="/times">Clubes</Link> {/* Link para a página de Clubes */}
                </li>
                <li>
                    <i className="bi bi-person"></i>
                    <Link to="/atletas">Atletas</Link> {/* Link para a página de Atletas */}
                </li>
                <li>
                    <i className="bi bi-file-earmark-text"></i>
                    <Link to="/relatorios">Relatórios</Link> {/* Link para a página de Relatórios */}
                </li>
                {userRole === 'Admin' && ( // Condicional baseado no papel do utilizador
                    <>
                        <li>
                            <i className="bi bi-people"></i>
                            <Link to="/equipas">Equipas</Link> {/* Link para a página de Equipas */}
                        </li>
                        <li>
                            <i className="bi bi-person-circle"></i>
                            <Link to="/utilizadores">Utilizadores</Link> {/* Link para a página de Utilizadores */}
                        </li>
                        <li onClick={toggleAdminDropdown} className="Sdropdown-toggle">
                            <i className="bi bi-tools"></i>
                            Administração
                            <span className="arrow">{isAdminOpen ? '▲' : '▼'}</span>
                        </li>
                        {isAdminOpen && (
                            <ul className="Sdropdown-menu">
                                <li>
                                    <i className="bi bi-check-circle"></i>
                                    <Link to="/validacoes">Validações</Link> {/* Link para Validações */}
                                </li>
                                <li>
                                    <i className="bi bi-window"></i>
                                    <Link to="/WebPage">Web Page</Link> {/* Link para Validações */}
                                </li>

                            </ul>
                        )}
                    </>
                )}
            </ul>
            <div className="footer">
                <Link to="/PoliticasPrivacidade">

                    <i className="bi bi-shield-lock"></i>

                    Políticas de Privacidade
                </Link>
                <button onClick={handleLogout} className="logout-button">
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </button>



            </div>
        </aside>
    );
}

export default Sidebar;
