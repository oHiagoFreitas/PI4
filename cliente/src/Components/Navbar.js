import React, { useState, useEffect } from 'react';
import '../Style/Navbar.css'; // Certifique-se de criar um arquivo CSS para a Navbar
import axios from 'axios'; // Para fazer requisições à API

function Navbar() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    

    // Carregar notificações não lidas
    useEffect(() => {
        const fetchNotificacoes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Notificacao/Criacao');
                const notificacoesNaoLidas = response.data.filter(not => !not.lida);
                setNotificacoes(notificacoesNaoLidas);
                setUnreadCount(notificacoesNaoLidas.length);
            } catch (error) {
                console.error('Erro ao buscar notificações', error);
            }
        };

        fetchNotificacoes();
    }, []);

    // Função para marcar notificação como lida
    const markAsRead = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/Notificacao/mark-as-read/${id}`);
            console.log('Resposta do servidor:', response);

            setNotificacoes(prevNotificacoes => 
                prevNotificacoes.map(notificacao => 
                    notificacao.id === id ? { ...notificacao, lida: true } : notificacao
                )
            );

            setUnreadCount(prevCount => prevCount - 1);

        } catch (error) {
            console.error('Erro ao marcar notificação como lida', error);
        }
    };

    // Função para alternar a exibição do dropdown
    const handleBellClick = () => {
        setShowDropdown(!showDropdown);
    };

    // Função para fechar o dropdown ao clicar fora
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('.notification-iconp')) {
            setShowDropdown(false);
        }
    };

    // Usar useEffect para adicionar um listener de clique fora
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <nav className="navbarp">
            <div className="user-infop">
                <i 
                    className="bi bi-bell notification-iconp"
                    onClick={handleBellClick}
                >
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span> 
                    )}
                </i>

                {showDropdown && (
                    <div className="dropdown-menu">
                        {notificacoes.length > 0 ? (
                            <>
                                {notificacoes.map((notificacao) => (
                                    <div 
                                        className="dropdown-item" 
                                        key={notificacao.id}
                                    >
                                        <div className="notification-content">
                                            {!notificacao.lida && (
                                                <i 
                                                    className="bi bi-eye eye-icon" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation();  
                                                        markAsRead(notificacao.id); 
                                                    }} 
                                                />
                                            )}
                                            <p>{notificacao.mensagem}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="dropdown-item">
                                <p>Não há notificações.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
