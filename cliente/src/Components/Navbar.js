import React, { useState, useEffect } from 'react';
import '../Style/Navbar.css'; // Certifique-se de criar um arquivo CSS para a Navbar
import axios from 'axios'; // Para fazer requisições à API

function Navbar() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userId, setUserId] = useState(null); // Para armazenar o ID do utilizador logado
    const [userRole, setUserRole] = useState(null); // Para armazenar o papel do utilizador

    // Carregar ID e papel do utilizador logado do localStorage
    useEffect(() => {
        const id = localStorage.getItem('userId');  // Supondo que o ID do usuário está armazenado no localStorage
        const role = localStorage.getItem('userRole');  // Supondo que o papel do usuário está armazenado no localStorage
        setUserId(id);
        setUserRole(role);
    }, []);

    console.log(userId, userRole); // Verifique se o ID e o papel do usuário estão corretos

    // Carregar notificações de criação apenas para usuários com papel 'admin'
    useEffect(() => {
        if (userRole === 'Admin') {
            const fetchNotificacoesCriacao = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/Notificacao/Criacao');
                    const notificacoesNaoLidas = response.data.filter(not => !not.lida);
                    setNotificacoes(prevNotificacoes => [...prevNotificacoes, ...notificacoesNaoLidas]);
                    setUnreadCount(prevCount => prevCount + notificacoesNaoLidas.length);
                } catch (error) {
                    console.error('Erro ao buscar notificações de criação', error);
                }
            };

            fetchNotificacoesCriacao();
        }
    }, [userRole]); // Recarrega quando o userRole mudar

    // Carregar notificações do utilizador logado apenas para o papel 'Scout'
    useEffect(() => {
        if (userRole === 'Scout' && userId) {  // Verifica se o papel é 'Scout'
            const fetchNotificacoesUsuario = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/Notificacao/utilizador/${userId}`);
                    const notificacoesNaoLidas = response.data.filter(not => !not.lida);
                    setNotificacoes(prevNotificacoes => [...prevNotificacoes, ...notificacoesNaoLidas]);
                    setUnreadCount(prevCount => prevCount + notificacoesNaoLidas.length);
                } catch (error) {
                    console.error('Erro ao buscar notificações do utilizador', error);
                }
            };

            fetchNotificacoesUsuario();
        }
    }, [userRole, userId]); // Recarrega quando o userRole ou userId mudar

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

                                        {notificacao.mensagem}
                                            
                                            {!notificacao.lida && (
                                                <i 
                                                    className="bi bi-check-circle" style={{marginLeft: "5px", color: "#DEAF5E"}}
                                                    onClick={(e) => { 
                                                        e.stopPropagation();  
                                                        markAsRead(notificacao.id); 
                                                    }} 
                                                />
                                            )}
                                            
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
