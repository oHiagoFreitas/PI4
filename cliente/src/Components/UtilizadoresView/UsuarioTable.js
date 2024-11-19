import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela
import CreateUserModal from '../CreateUserModal'; // Modal de criação de usuário
import TabelaUsuarios from './TabelaUsuarios'; // Componente da Tabela de Usuários

function UsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Usuário selecionado para edição

  // Carregar os dados dos usuários na inicialização
  useEffect(() => {
    axios
      .get('http://localhost:3000/utilizadores') // Rota de usuários
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error('Erro ao carregar usuários:', error));
  }, []);

  const openCreateUserModal = () => setIsCreateModalOpen(true);
  const closeCreateUserModal = () => setIsCreateModalOpen(false);

  const openEditUserModal = (usuario) => {
    setSelectedUsuario(usuario); // Define o usuário selecionado
    setIsEditModalOpen(true); // Abre o modal de edição
  };

  const closeEditUserModal = () => {
    setSelectedUsuario(null); // Reseta o usuário selecionado
    setIsEditModalOpen(false);
  };

  // Lidar com a exclusão de um usuário
  const handleDelete = (usuarioId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o usuário ${usuarioId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/utilizadores/${usuarioId}`) // Rota de delete de usuários
          .then(() => {
            Swal.fire('Deletado!', 'O usuário foi excluído.', 'success');
            setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioId));
          })
          .catch((error) => {
            console.error('Erro ao excluir usuário:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o usuário.', 'error');
          });
      }
    });
  };

  // Função para atualizar a lista de usuários quando um usuário é criado ou editado
  const handleUserUpdated = (updatedUser) => {
    const updatedUsers = usuarios.map((usuario) =>
      usuario.id === updatedUser.id ? updatedUser : usuario
    );
    setUsuarios(updatedUsers); // Atualiza a lista de usuários com o usuário editado
  };

  return (
    <div className="usuarios-table-containerAT">
      {/* Botões de Ação: Criar Usuário */}
      <div className="actions-buttonsAT">
        <button
          className="button-createAT"
          onClick={openCreateUserModal}
        >
          Criar Usuário
        </button>
      </div>

      {/* Tabela com dados dos usuários */}
      <TabelaUsuarios 
        usuarios={usuarios}
        handleEdit={openEditUserModal}
        handleDelete={handleDelete}
      />

      {/* Modal de Criação de Usuário (também usado para edição) */}
      <CreateUserModal
        isOpen={isCreateModalOpen || isEditModalOpen} // Modal aberto para criação ou edição
        onRequestClose={isCreateModalOpen ? closeCreateUserModal : closeEditUserModal}
        onUserCreated={handleUserUpdated} // Atualiza a lista de usuários no componente principal
        selectedUsuario={selectedUsuario} // Passando o usuário selecionado para o modal de edição
        isEditModal={isEditModalOpen} // Passando a informação de que é um modal de edição
        onEditRequestClose={closeEditUserModal} // Fechando o modal de edição
      />
    </div>
  );
}

export default UsuariosTable;
