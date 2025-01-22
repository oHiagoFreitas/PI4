import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import SearchPlayerModal from './SearchPlayerModal'; // Certifique-se de importar corretamente
import '../Style/CreateReportModal.css'; // Certifique-se de que o caminho para o CSS está correto

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: 'auto',
        maxHeight: '80vh',
        padding: '20px',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
};

const CreateReportModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        tecnica: [false, false, false, false, false],
        velocidade: [false, false, false, false, false],
        atitudeCompetitiva: [false, false, false, false, false],
        inteligencia: [false, false, false, false, false],
        altura: '',
        morfologia: '',
        ratingFinal: [false, false, false, false, false],
        comentario: '',
        atletaNome: '',
    });

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const handleChangeCheckbox = (field, index) => {
        const updatedField = Array(formData[field].length).fill(false);
        updatedField[index] = true;

        setFormData({
            ...formData,
            [field]: updatedField,
        });
    };

    const handleSelectPlayer = (playerName) => {
        setFormData({ ...formData, atletaNome: playerName });
        setIsSearchModalOpen(false); // Fecha o modal de busca ao selecionar o jogador
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            Swal.fire({
                title: 'Erro!',
                text: 'Usuário não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        const getRating = (checkboxArray) => {
            const rating = checkboxArray.map((checked, index) => (checked ? index + 1 : 0));
            return Math.max(...rating);
        };

        const newReportData = {
            ...formData,
            tecnica: getRating(formData.tecnica),
            velocidade: getRating(formData.velocidade),
            atitudeCompetitiva: getRating(formData.atitudeCompetitiva),
            inteligencia: getRating(formData.inteligencia),
            ratingFinal: getRating(formData.ratingFinal),
            scoutId: userId,
        };

        try {
            const response = await axios.post('https://pi4-hdnd.onrender.com/relatorios', newReportData);
            console.log('Relatório criado:', response.data);

            await axios.post('https://pi4-hdnd.onrender.com/Notificacao', {
                conteudo: `Um novo relatório foi submetido para aprovação. Atleta: ${formData.atletaNome}.`,
                tipo: 'Criação',
                remetenteId: userId,
                destinatarioId: 1,
            });

            Swal.fire({
                title: 'Sucesso!',
                text: 'Relatório criado com sucesso. Está aguardando aprovação.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            onRequestClose();

            setFormData({
                tecnica: [false, false, false, false, false],
                velocidade: [false, false, false, false, false],
                atitudeCompetitiva: [false, false, false, false, false],
                inteligencia: [false, false, false, false, false],
                altura: '',
                morfologia: '',
                ratingFinal: [false, false, false, false, false],
                comentario: '',
                atletaNome: '',
            });
        } catch (error) {
            console.error('Erro ao criar relatório:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao criar relatório. Por favor, tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Criar Relatório"
        >
            <h2 className="modal-title">Criar Relatório</h2>
            <form onSubmit={handleSubmit} className="create-report-form">
                {/* Outros campos do formulário */}

                <div className="form-group-report">
                    <label>Nome do Atleta:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={formData.atletaNome}
                            onChange={(e) => setFormData({ ...formData, atletaNome: e.target.value })}
                            required
                            className="form-input-report"
                            placeholder="Selecione ou digite o nome do atleta"
                        />
                        <button
                            type="button"
                            onClick={() => setIsSearchModalOpen(true)}
                            className="submit-button"
                        >
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Botões e submissão */}
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Criar Relatório</button>
                    <button type="button" onClick={onRequestClose} className="submit-button" style={{ marginLeft: '10px' }}>Cancelar</button>
                </div>
            </form>

            {/* Modal de busca de atletas */}
            <SearchPlayerModal
                isOpen={isSearchModalOpen}
                onRequestClose={() => setIsSearchModalOpen(false)}
                onPlayerSelect={handleSelectPlayer}
            />
        </Modal>
    );
};

export default CreateReportModal;
