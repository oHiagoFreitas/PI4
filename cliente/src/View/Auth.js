import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../Style/Auth.css';
import AcadLogo from '../img/AcadLogo.png';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, senha });
      
      // Armazenando o token e id no localStorage
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('userId', response.data.id); // Armazena o id do usuário
      localStorage.setItem('userRole', response.data.role); // Adiciona o papel do usuário no localStorage

      const userRole = response.data.role; // Supondo que a role do usuário venha na resposta da API

      // Log para depuração
      console.log('Role do usuário:', userRole);
      console.log('ID do usuário:', response.data.id); // Log para o ID do usuário

      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Redireciona com base na role do usuário
        if (userRole === 'Admin' || userRole === 'Scout') {
          navigate('/backoffice'); // Redireciona para a página de backoffice
        } else if (userRole === 'Consultor') {
          navigate('/backofficeConsultor'); // Redireciona para a página de backofficeConsultor
        } else {
          // Caso a role não seja reconhecida, redireciona para uma página padrão
          console.warn('Role não reconhecida, redirecionando para a página inicial.');
          navigate('/');
        }
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro de login:', errorMessage); // Log para depuração de erro
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="yellow-line top"></div> {/* Linha amarela superior */}

      <div className="auth-content">
        <div className="form-background">
          <h2>Login</h2>
          <img src={AcadLogo} alt="Logo do time" className="logo" />
          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />

            <div className="forgot-password">
              <a href="/forgot-password">Esqueceu a senha?</a>
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="no-account">
            <p>Não tem conta? <a href="/signup">Cadastre-se</a></p>
          </div>
        </div>
      </div>

      <div className="yellow-line bottom"></div> {/* Linha amarela inferior */}
    </div>
  );
};

export default Auth;
