import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Style/Auth.css';

import AcadLogo from '../img/AcadLogo.png';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, senha });
      localStorage.setItem('token', response.data.token);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido';
      setError(errorMessage);
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
          <img
            src={AcadLogo}
            alt="Logo do time"
            className="logo"
          />
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

          {/* Linhas adicionais para "Esqueceu a senha?" e "Não tem conta?" */}

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
