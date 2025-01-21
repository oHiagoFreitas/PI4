import React, { useState, useEffect } from 'react';
import '../Style/Navbar.css';
import axios from 'axios';

function Navbar() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        setUserId(id);
        setUserRole(role);
    }, []);

    useEffect(() => {
        if (userRole === 'Admin') {
            const fetchNotificacoesCriacao = async () => {
                try {
                    const response = await axios.get('https://pi4-hdnd.onrender.com/Notificacao/Criacao');
                    const notificacoesNaoLidas = response.data.filter(not => !not.lida);
                    notificacoesNaoLidas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setNotificacoes(prev => [...prev, ...notificacoesNaoLidas]);
                    setUnreadCount(prev => prev + notificacoesNaoLidas.length);
                } catch (error) {
                    console.error('Erro ao buscar notificações de criação', error);
                }
            };
            fetchNotificacoesCriacao();
        }
    }, [userRole]);

    useEffect(() => {
        if (userRole === 'Scout' && userId) {
            const fetchNotificacoesUsuario = async () => {
                try {
                    const response = await axios.get(`https://pi4-hdnd.onrender.com/Notificacao/utilizador/${userId}`);
                    const notificacoesNaoLidas = response.data.filter(not => !not.lida);
                    notificacoesNaoLidas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setNotificacoes(prev => [...prev, ...notificacoesNaoLidas]);
                    setUnreadCount(prev => prev + notificacoesNaoLidas.length);
                } catch (error) {
                    console.error('Erro ao buscar notificações do utilizador', error);
                }
            };
            fetchNotificacoesUsuario();
        }
    }, [userRole, userId]);

    const markAsRead = async (id) => {
        try {
            await axios.put(`https://pi4-hdnd.onrender.com/Notificacao/mark-as-read/${id}`);
            setNotificacoes(prev =>
                prev.map(notificacao =>
                    notificacao.id === id ? { ...notificacao, lida: true } : notificacao
                )
            );
            setUnreadCount(prev => prev - 1);
        } catch (error) {
            console.error('Erro ao marcar notificação como lida', error);
        }
    };

    const markAllAsRead = () => {
        notificacoes.forEach(not => {
            if (!not.lida) markAsRead(not.id);
        });
    };

    const handleBellClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOutsideClick = (e) => {
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('.notification-iconp')) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const getNotificationIcon = (tipo) => {
        switch (tipo) {
            case 'info': return 'bi-info-circle';
            case 'warning': return 'bi-exclamation-circle';
            case 'success': return 'bi-check-circle';
            default: return 'bi-bell';
        }
    };

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
                                <div className="dropdown-header">
                                    <span className="notifications-title">Notificações</span>
                                    <button 
                                        className="mark-all-read-btn" 
                                        onClick={markAllAsRead}
                                    >
                                        Marcar todas como lidas
                                    </button>
                                </div>
                                {notificacoes.map((notificacao) => (
                                    <div 
                                        className={`dropdown-item ${notificacao.lida ? 'read' : 'unread'}`} 
                                        key={notificacao.id}
                                    >
                                        <div className="notification-content">
                                            <i className={`bi ${getNotificationIcon(notificacao.tipo)} notification-type-icon`}></i>
                                            {notificacao.mensagem}
                                            {!notificacao.lida && (
                                                <i 
                                                    className="bi bi-check-circle" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation();  
                                                        markAsRead(notificacao.id); 
                                                    }} 
                                                    style={{ marginLeft: "5px", color: "#DEAF5E" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="loading-placeholder">
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
