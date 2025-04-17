import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../Style/Auth.css'; // Importa o estilo existente, se necessário
import AcadLogo from '../img/AcadLogo.png'; // Importe seu logo

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('Admin'); // Role padrão
  const navigate = useNavigate(); // Inicializa o useNavigate

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Requisição de cadastro do usuário
      const response = await axios.post('http://localhost:3000/utilizadores/', { nome, email, senha, role });

      console.log('Resposta da API ao criar usuário:', response.data);

      // Após o cadastro, cria a notificação
      await axios.post('http://localhost:3000/Notificacao/', {
        conteudo: `Um novo utilizador "${nome}" foi cadastrado e está a espera de verificação.`,
        tipo: 'Criação',
        remetenteId: 1,  // Pode ser alterado para o ID do remetente
        destinatarioId: 1  // Pode ser alterado para o ID do destinatário
      });

      // Alerta de sucesso de cadastro
      Swal.fire({
        title: 'Sucesso!',
        text: 'Cadastro realizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Redireciona para a página de login após o alerta ser fechado
        navigate('/login'); // Altere para a rota correta para a página de login
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido';
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
          <h2>Sign Up</h2>
          <img
            src={AcadLogo}
            alt="Logo do time"
            className="logo"
          />
          <form onSubmit={handleSignUp} className="login-form">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />

            <label htmlFor="role">Função:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="role-select" // Adicionei uma classe para estilização
            >
              <option value="Admin">Admin</option>
              <option value="Scout">Scout</option>
              <option value="Consultor">Consultor</option>
            </select>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>

      <div className="yellow-line bottom"></div> {/* Linha amarela inferior */}
    </div>
  );
};

export default SignUp;
