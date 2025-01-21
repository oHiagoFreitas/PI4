import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

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

const TextEditModal = ({ isVisible, editData, setEditData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(editData);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const response = await axios.put('https://pi4-hdnd.onrender.com/MicroSite/1', formData);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'As alterações foram salvas.',
                confirmButtonText: 'Ok'
            });

            onSave(response.data);
            onCancel();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não foi possível salvar as alterações.',
                confirmButtonText: 'Ok'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isVisible}
            onRequestClose={onCancel}
            style={customStyles}
            contentLabel="Editar Texto"
        >
            <h2 className="modal-title">Editar Texto</h2>
            <form onSubmit={handleSubmit} className="modal-content">
                <div className="form-group">
                    <label htmlFor="titulo">Título da Página:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mensagem">Conteúdo:</label>
                    <textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" className="submit-button" onClick={onCancel} style={{marginTop: '10px', backgroundColor: 'black'}}>
                    Cancelar
                </button>
            </form>
        </Modal>
    );
};

export default TextEditModal;
