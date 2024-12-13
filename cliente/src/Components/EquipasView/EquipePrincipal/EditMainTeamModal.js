// src/Components/EquipasView/EditMainTeamModal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditMainTeamModal({ isOpen, onClose, teamId, onUpdate }) {
    // Estado para armazenar os dados da equipe principal sendo editada
    const [teamData, setTeamData] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        formacaoNome: ''
    });

    // Função para buscar os dados da equipe principal por ID
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/equipePrincipal/${teamId}`);
                setTeamData({
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    categoria: response.data.categoria,
                    formacaoNome: response.data.formacao?.nome || ''
                });
            } catch (error) {
                console.error('Erro ao buscar equipe principal:', error);
            }
        };

        if (isOpen && teamId) {
            fetchTeamData();
        }
    }, [isOpen, teamId]);

    // Função para editar a equipe principal
    const editMainTeam = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/equipePrincipal/${teamId}/Nome`, teamData);
            console.log('Equipe principal editada:', response.data);
            onUpdate(response.data); // Passa os dados atualizados para o componente pai
            onClose(); // Fecha a modal após a edição
        } catch (error) {
            console.error('Erro ao editar equipe principal:', error);
        }
    };

    // Se a modal não estiver aberta, não renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlayES">
            <div className="modal-contentES">
                <h3>Editar Equipa Principal</h3>
                <input
                    type="text"
                    placeholder="Nome"
                    value={teamData.nome}
                    onChange={(e) => setTeamData({ ...teamData, nome: e.target.value })}
                    className="input-fieldES"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={teamData.descricao}
                    onChange={(e) => setTeamData({ ...teamData, descricao: e.target.value })}
                    className="input-fieldES"
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={teamData.categoria}
                    onChange={(e) => setTeamData({ ...teamData, categoria: e.target.value })}
                    className="input-fieldES"
                />
                <input
                    type="text"
                    placeholder="Formação"
                    value={teamData.formacaoNome}
                    onChange={(e) => setTeamData({ ...teamData, formacaoNome: e.target.value })}
                    className="input-fieldES"
                />
                <div className="modal-actionsES">
                    <button className="button-createAT button-createES" onClick={editMainTeam}>Salvar</button>
                    <button className="button-cancelES" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default EditMainTeamModal;
