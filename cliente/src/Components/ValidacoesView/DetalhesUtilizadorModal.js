//DetalhesUtilizadorModal

import React, { useState, useEffect } from 'react';
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
        width: '500px', // Ajuste a largura conforme necessário
        padding: '20px',
    },
};

const UserDetailsModal = ({ isOpen, onRequestClose, selectedUsuario }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Detalhes do Usuário"
        >
            <h2 className="modal-title">Detalhes do Usuário</h2>
            <div className="user-details">
                <div className="detail-item">
                    <strong>Nome:</strong>
                    <p>{selectedUsuario ? selectedUsuario.nome : ''}</p>
                </div>
                <div className="detail-item">
                    <strong>Email:</strong>
                    <p>{selectedUsuario ? selectedUsuario.email : ''}</p>
                </div>
                <div className="detail-item">
                    <strong>Role:</strong>
                    <p>{selectedUsuario ? selectedUsuario.role : ''}</p>
                </div>
            </div>
            <button onClick={onRequestClose} className="close-button">Fechar</button>
        </Modal>
    );
};

export default UserDetailsModal;
