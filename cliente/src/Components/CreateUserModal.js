import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import '../Style/CreateUserModal.css'; // Certifique-se de que o caminho para o CSS está correto

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', // Ajuste a largura conforme necessário
        padding: '20px',
    },
};

const CreateUserModal = ({ isOpen, onRequestClose, onUserCreated, selectedUsuario, isEditModal, onEditRequestClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        role: '',
    });

    useEffect(() => {
        if (isEditModal && selectedUsuario) {
            setFormData({
                nome: selectedUsuario.nome,
                email: selectedUsuario.email,
                senha: '', // Não queremos mostrar a senha no formulário de edição
                role: selectedUsuario.role,
            });
        }
    }, [isEditModal, selectedUsuario]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isEditModal) {
                response = await axios.put(
                    `http://localhost:3000/utilizadores/${selectedUsuario.id}`,
                    formData
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Usuário Atualizado!',
                    text: 'O usuário foi atualizado com sucesso.',
                    confirmButtonText: 'Ok',
                });
            } else {
                response = await axios.post('http://localhost:3000/utilizadores', formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Usuário Criado!',
                    text: 'O usuário foi criado com sucesso.',
                    confirmButtonText: 'Ok',
                });
            }

            // Chama a função para atualizar a lista de usuários no componente principal
            if (onUserCreated) {
                onUserCreated(response.data);
            }

            onEditRequestClose(); // Fecha o modal de edição
            onRequestClose(); // Fecha o modal de criação
            setFormData({
                nome: '',
                email: '',
                senha: '',
                role: '',
            });
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao salvar o usuário. Por favor, tente novamente.',
                confirmButtonText: 'Ok',
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={isEditModal ? "Editar Usuário" : "Criar Usuário"}
        >
            <h2 className="modal-title">{isEditModal ? "Editar Usuário" : "Criar Usuário"}</h2>
            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group-user">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="form-input-user"
                    />
                </div>
                <div className="form-group-user">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input-user"
                    />
                </div>
                {!isEditModal && (
                    <div className="form-group-user">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            className="form-input-user"
                        />
                    </div>
                )}
                <div className="form-group-user">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="form-input-user"
                    >
                        <option value="">Selecione uma função</option>
                        <option value="Admin">Admin</option>
                        <option value="Scout">Scout</option>
                        <option value="Consultor">Consultor</option>
                    </select>
                </div>
                <button type="submit" className="submit-button-user">
                    {isEditModal ? "Salvar Alterações" : "Criar Usuário"}
                </button>
            </form>
        </Modal>
    );
};

export default CreateUserModal;
