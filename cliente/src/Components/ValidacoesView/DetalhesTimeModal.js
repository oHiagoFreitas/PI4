import React from 'react';
import Modal from 'react-modal';
import '../../Style/CreateUserModal.css'; // Certifique-se de que o caminho para o CSS está correto

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px', // Largura do modal
        padding: '15px',
    },
};

const TeamDetailsModal = ({ isOpen, onRequestClose, teamData }) => {
    // Verifica se teamData é nulo ou indefinido
    if (!teamData) {
        return null; // Não renderiza nada enquanto não houver dados
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Detalhes do Time"
        >
            <h2 className="modal-title">Detalhes do Time</h2>
            <div className="team-details">
                <div className="detail-item">
                    <strong>Nome:</strong>
                    <p>{teamData.nome}</p>
                </div>
                <div className="detail-item">
                    <strong>País:</strong>
                    <p>{teamData.pais}</p>
                </div>
                <div className="detail-item">
                    <strong>Categoria:</strong>
                    <p>{teamData.categoria}</p>
                </div>
                <div className="detail-item">
                    <strong>Descrição:</strong>
                    <p>{teamData.descricao}</p>
                </div>
            </div>
            <button onClick={onRequestClose} className="close-button">Fechar</button>
        </Modal>
    );
};

export default TeamDetailsModal;
