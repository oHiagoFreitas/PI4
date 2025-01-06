import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import '../Style/CreateTeamModal.css'; // Certifique-se de que o caminho para o CSS está correto

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px', // Ajuste a largura para um tamanho menor
        padding: '15px', // Reduzindo o padding
    },
};

const CreateTeamModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        pais: '',
        categoria: '',
        descricao: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/times/createTimeAprovado', formData);
            console.log('Time criado:', response.data);
            
            // Alerta de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Time Criado!',
                text: 'O time foi criado com sucesso.',
                confirmButtonText: 'Ok'
            });

            onRequestClose(); // Fecha o modal
            setFormData({
                nome: '',
                pais: '',
                categoria: '',
                descricao: '',
            });
        } catch (error) {
            console.error('Erro ao criar time:', error);
            
            // Alerta de erro
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao criar o time. Por favor, tente novamente.',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Criar Time"
        >
            <h2 className="modal-title">Criar Time</h2>
            <form onSubmit={handleSubmit} className="create-team-form">
                <div className="form-group-team">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="form-input-team"
                    />
                </div>
                <div className="form-group-team">
                    <label htmlFor="pais">País:</label>
                    <input
                        type="text"
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                        className="form-input-team"
                    />
                </div>
                <div className="form-group-team">
                    <label htmlFor="categoria">Categoria:</label>
                    <input
                        type="text"
                        id="categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                        className="form-input-team"
                    />
                </div>
                <div className="form-group-team">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        className="form-input-team"
                    />
                </div>
                <button type="submit" className="submit-button-team">Criar Time</button>
            </form>
        </Modal>
    );
};

export default CreateTeamModal;
