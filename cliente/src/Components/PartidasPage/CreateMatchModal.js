// src/Components/CreateMatchModal.js

import React, { useState } from 'react';
import Modal from 'react-modal'; // Usando o modal de react-modal
import Swal from 'sweetalert2';
import axios from 'axios';
import '../../Style/AtletasView/AtletasTable.css'; // Estilo para o modal

// Modal de criação de partida
function CreateMatchModal({ isOpen, onRequestClose }) {
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!time1 || !time2 || !hora || !local) {
            Swal.fire('Erro', 'Por favor, preencha todos os campos!', 'error');
            return;
        }

        const newMatch = {
            time1,
            time2,
            hora,
            local,
        };

        try {
            await axios.post('http://localhost:3000/partidas', newMatch); // Envia os dados para a API
            Swal.fire('Partida Criada!', 'A partida foi criada com sucesso.', 'success');
            onRequestClose(); // Fecha o modal
        } catch (error) {
            console.error('Erro ao criar a partida:', error);
            Swal.fire('Erro', 'Ocorreu um erro ao criar a partida.', 'error');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Partida"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Criar Partida</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="time1">Time 1:</label>
                    <input
                        type="text"
                        id="time1"
                        value={time1}
                        onChange={(e) => setTime1(e.target.value)}
                        placeholder="Nome do Time 1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time2">Time 2:</label>
                    <input
                        type="text"
                        id="time2"
                        value={time2}
                        onChange={(e) => setTime2(e.target.value)}
                        placeholder="Nome do Time 2"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hora">Hora:</label>
                    <input
                        type="time"
                        id="hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="local">Local:</label>
                    <input
                        type="text"
                        id="local"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        placeholder="Local do Jogo"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Criar Partida</button>
                    <button type="button" onClick={onRequestClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateMatchModal;
