import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import '../Style/CreateReportModal.css'; // Certifique-se de que o caminho para o CSS está correto

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', // Aumentando a largura do modal
        height: 'auto', // Definindo a altura como automática
        maxHeight: '80vh', // Definindo uma altura máxima para evitar transbordamento
        padding: '20px', // Ajustando o padding
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
};

const CreateReportModal = ({ isOpen, onRequestClose, atletaNome  }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [formData, setFormData] = useState({
        tecnica: [false, false, false, false, false],
        velocidade: [false, false, false, false, false],
        atitudeCompetitiva: [false, false, false, false, false],
        inteligencia: [false, false, false, false, false],
        altura: '',
        morfologia: '',
        ratingFinal: [false, false, false, false, false],
        comentario: '',
        atletaNome: atletaNome || ''
    });

    const handlePlayerSelection = (player) => {
        setSelectedPlayer(player.nome);  // Atualize o estado com o nome do jogador
    };

    const handleChangeCheckbox = (field, index) => {
        const updatedField = Array(formData[field].length).fill(false); // Cria um array com todos os valores como false
        updatedField[index] = true; // Marca apenas o índice selecionado

        setFormData({
            ...formData,
            [field]: updatedField,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            tecnica,
            velocidade,
            atitudeCompetitiva,
            inteligencia,
            altura,
            morfologia,
            ratingFinal,
            comentario,
            atletaNome
        } = formData;

        // Obter o userId do localStorage
        const userId = localStorage.getItem('userId'); // Aqui você acessa o ID do usuário logado

        // Verifique se o userId existe
        if (!userId) {
            Swal.fire({
                title: 'Erro!',
                text: 'Usuário não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Função para calcular o rating baseado nos checkboxes
        const getRating = (checkboxArray) => {
            const rating = checkboxArray.map((checked, index) => checked ? index + 1 : 0);
            return Math.max(...rating);
        };

        const newReportData = {
            tecnica: getRating(tecnica),
            velocidade: getRating(velocidade),
            atitudeCompetitiva: getRating(atitudeCompetitiva),
            inteligencia: getRating(inteligencia),
            altura,
            morfologia,
            ratingFinal: getRating(ratingFinal),
            comentario,
            atletaNome,
            scoutId: userId  // Enviando o userId como scoutid
        };

        try {
            // Enviando a requisição para o backend para criar o relatório
            const response = await axios.post('https://pi4-hdnd.onrender.com/relatorios', newReportData);
            console.log('Relatório criado:', response.data);

            // Após criar o relatório, enviar uma notificação que um relatório está aguardando aprovação
            await axios.post('https://pi4-hdnd.onrender.com/Notificacao', {
                conteudo: `Um novo relatório foi submetido para aprovação. Atleta: ${atletaNome}.`,
                tipo: "Criação",
                remetenteId: userId,  // ID do scout que criou o relatório
                destinatarioId: 1  // Este valor deve ser o ID do destinatário (ex: Administrador ou responsável)
            });

            Swal.fire({
                title: 'Sucesso!',
                text: 'Relatório criado com sucesso. Está aguardando aprovação.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Fechar o modal após o sucesso
            onRequestClose();

            // Resetar os campos do formulário
            setFormData({
                tecnica: [false, false, false, false, false],
                velocidade: [false, false, false, false, false],
                atitudeCompetitiva: [false, false, false, false, false],
                inteligencia: [false, false, false, false, false],
                altura: '',
                morfologia: '',
                ratingFinal: [false, false, false, false, false],
                comentario: '',
                atletaNome: ''
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
                <div className="form-group-report">
                    <label>Técnica:</label>
                    <div className="checkbox-group">
                        {formData.tecnica.map((checked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChangeCheckbox('tecnica', index)}
                                />
                                <label className={`checkbox-color-${index + 1}`}>{index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-report">
                    <label>Velocidade:</label>
                    <div className="checkbox-group">
                        {formData.velocidade.map((checked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChangeCheckbox('velocidade', index)}
                                />
                                <label className={`checkbox-color-${index + 1}`}>{index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-report">
                    <label>Atitude Competitiva:</label>
                    <div className="checkbox-group">
                        {formData.atitudeCompetitiva.map((checked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChangeCheckbox('atitudeCompetitiva', index)}
                                />
                                <label className={`checkbox-color-${index + 1}`}>{index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-report">
                    <label>Inteligência:</label>
                    <div className="checkbox-group">
                        {formData.inteligencia.map((checked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChangeCheckbox('inteligencia', index)}
                                />
                                <label className={`checkbox-color-${index + 1}`}>{index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-report">
                    <label>Altura:</label>
                    <select
                        value={formData.altura}
                        onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                        required
                        className="form-input-report"
                    >
                        <option value="">Selecione a altura</option>
                        <option value="alto">Alto</option>
                        <option value="medio">Médio</option>
                        <option value="baixo">Baixo</option>
                    </select>
                </div>
                <div className="form-group-report">
                    <label>Morfologia:</label>
                    <select
                        value={formData.morfologia}
                        onChange={(e) => setFormData({ ...formData, morfologia: e.target.value })}
                        required
                        className="form-input-report"
                    >
                        <option value="">Selecione a morfologia</option>
                        <option value="ectomorfo">Ectomorfo</option>
                        <option value="mesomorfo">Mesomorfo</option>
                        <option value="endomorfo">Endomorfo</option>
                    </select>
                </div>
                <div className="form-group-report">
                    <label>Rating Final:</label>
                    <div className="checkbox-group">
                        {formData.ratingFinal.map((checked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChangeCheckbox('ratingFinal', index)}
                                />
                                <label>{index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-report">
                    <label>Comentário:</label>
                    <textarea
                        value={formData.comentario}
                        onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                        className="form-input-report"
                        rows=""
                    />
                </div>
                <div className="form-group-report">
                    <label>Jogador Selecionado:</label>
                    <SearchPlayerModal onPlayerSelect={handlePlayerSelection} />
                    {selectedPlayer && <p>{selectedPlayer}</p>} {/* Exibe o nome do jogador selecionado */}
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Criar Relatório</button>
                    <button type="button" onClick={onRequestClose} className="submit-button" style={{marginLeft: '10px'}}>Cancelar</button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateReportModal;
