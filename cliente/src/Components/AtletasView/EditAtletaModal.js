import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/CreateAthleteModal.css'; // Importando o CSS dos modais

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        padding: '15px',
    },
};

const EditAthleteModal = ({ isOpen, onRequestClose, athleteData }) => {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        ano: '',
        nacionalidade: '',
        posicao: '',
        clube: '',
        link: '',
        agente: '',
        contactoAgente: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Preenche os campos ao abrir o modal com os dados do atleta fornecido
    useEffect(() => {
        if (athleteData) {
            setFormData({ ...athleteData });
        }
    }, [athleteData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.put(`http://localhost:3000/atletas/${athleteData.id}`, formData);
            console.log('Atleta atualizado:', response.data);

            Swal.fire({
                icon: 'success',
                title: 'Atleta Atualizado!',
                text: 'As informações do atleta foram atualizadas com sucesso.',
                confirmButtonText: 'Ok',
            });

            onRequestClose(); // Fecha o modal
        } catch (error) {
            console.error('Erro ao atualizar atleta:', error);

            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao atualizar o atleta. Por favor, tente novamente.',
                confirmButtonText: 'Ok',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Editar Atleta"
        >
            <h2 className="modal-title">Editar Atleta</h2>
            <form onSubmit={handleSubmit} className="modal-content">
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nacionalidade">Nacionalidade:</label>
                    <input
                        type="text"
                        id="nacionalidade"
                        name="nacionalidade"
                        value={formData.nacionalidade}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="posicao">Posição:</label>
                    <select
                        id="posicao"
                        name="posicao"
                        value={formData.posicao}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Selecione uma posição</option>
                        <option value="Guarda-Redes">Guarda-Redes</option>
                        <option value="Defesa Central">Defesa Central</option>
                        <option value="Defesa Esquerda">Defesa Esquerda</option>
                        <option value="Defesa Direita">Defesa Direita</option>
                        <option value="Meio Campista">Meio Campista</option>
                        <option value="Atacante">Atacante</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ano">Ano:</label>
                    <input
                        type="number"
                        id="ano"
                        name="ano"
                        value={formData.ano}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clube">Clube:</label>
                    <input
                        type="text"
                        id="clube"
                        name="clube"
                        value={formData.clube}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link:</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="agente">Agente:</label>
                    <input
                        type="text"
                        id="agente"
                        name="agente"
                        value={formData.agente}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactoAgente">Contato do Agente:</label>
                    <input
                        type="text"
                        id="contactoAgente"
                        name="contactoAgente"
                        value={formData.contactoAgente}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Atualizando...' : 'Atualizar Atleta'}
                </button>
            </form>
        </Modal>
    );
};

export default EditAthleteModal;
