// src/Components/EquipasView/CreateShadowTeamModal.js

import React, { useState } from 'react';
import axios from 'axios';

function CreateShadowTeamModal({ isOpen, onClose, onCreate }) {
    // Estado para armazenar os dados da nova equipa sombra
    const [newTeam, setNewTeam] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        formacaoNome: ''
    });

    // Função para criar a nova equipa sombra
    const createShadowTeam = async () => {
        try {
            const response = await axios.post('http://localhost:3000/equipeSombra', newTeam);
            console.log('Nova equipa sombra criada:', response.data);
            onCreate(response.data); // Passa a nova equipa criada para o componente pai
            onClose(); // Fecha a modal após a criação
        } catch (error) {
            console.error('Erro ao criar equipa sombra:', error);
        }
    };

    // Se a modal não estiver aberta, não renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlayES">
            <div className="modal-contentES">
                <h3>Criar Nova Equipa Sombra</h3>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={newTeam.nome} 
                    onChange={(e) => setNewTeam({ ...newTeam, nome: e.target.value })} 
                    className="input-fieldES"
                />
                <input 
                    type="text" 
                    placeholder="Descrição" 
                    value={newTeam.descricao} 
                    onChange={(e) => setNewTeam({ ...newTeam, descricao: e.target.value })} 
                    className="input-fieldES"
                />
                <input 
                    type="text" 
                    placeholder="Categoria" 
                    value={newTeam.categoria} 
                    onChange={(e) => setNewTeam({ ...newTeam, categoria: e.target.value })} 
                    className="input-fieldES"
                />
                <input 
                    type="text" 
                    placeholder="Formação" 
                    value={newTeam.formacaoNome} 
                    onChange={(e) => setNewTeam({ ...newTeam, formacaoNome: e.target.value })} 
                    className="input-fieldES"
                />
                <div className="modal-actionsES">
                    <button className="button-createAT button-createES" onClick={createShadowTeam}>Criar</button>
                    <button className="button-cancelES" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default CreateShadowTeamModal;
