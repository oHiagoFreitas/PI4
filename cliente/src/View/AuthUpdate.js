import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../Style/Auth.css';
import AcadLogo from '../img/AcadLogo.png';

const AuthUpdate = () => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState(''); // Novo campo para senha
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      // Atualiza a senha
      const response = await axios.post('http://localhost:3000/auth/UpdatePassword', {
        email,
        novaSenha,
      });

      // Criação de notificação
      await axios.post('http://localhost:3000/Notificacao', {
        conteudo: `O utilizador com o email ${email} fez uma solicitação de redefinição de senha.`,
        tipo: "Criação",
        remetenteId: 1,  // Pode ser alterado para o ID do remetente
        destinatarioId: 1  // Pode ser alterado para o ID do destinatário
      });

      Swal.fire({
        title: 'Sucesso!',
        text: 'Senha atualizada com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        navigate('/'); // Redireciona para a página inicial após atualização
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao atualizar senha:', errorMessage); // Log para depuração de erro
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="yellow-line top"></div> {/* Linha amarela superior */}

      <div className="auth-content">
        <div className="form-background">
          <h2>Alterar Senha</h2>
          <img src={AcadLogo} alt="Logo do time" className="logo" />
          <form onSubmit={handlePasswordUpdate} className="login-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <label htmlFor="new-password">Nova Senha:</label>
            <input
              type="password"
              id="new-password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite sua nova senha"
              required
            />

            <button type="submit">Atualizar Senha</button>
          </form>

          <div className="back-to-login">
            <p>
              <a href="/login">Voltar ao Login</a>
            </p>
          </div>
        </div>
      </div>

      <div className="yellow-line bottom"></div> {/* Linha amarela inferior */}
    </div>
  );
};

export default AuthUpdate;
