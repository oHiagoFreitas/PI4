import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importando o SweetAlert

function EditShadowTeamModal({ isOpen, onClose, teamId, onUpdate }) {
    // Estado para armazenar os dados da equipe sombra sendo editada
    const [teamData, setTeamData] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        formacaoNome: ''
    });

    const formations = ["3-4-3", "3-5-2", "4-3-3", "4-2-4", "4-4-2", "4-2-3-1", "5-2-3", "5-3-2", "5-4-1"];
    const categories = ["Sub-20", "Sub-21", "Sub-21", "Sub-23", "Seniors"]; // Opções de categorias

    // Função para buscar os dados da equipe sombra por ID
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`https://localhost:3000/equipeSombra/${teamId}`);
                setTeamData({
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    categoria: response.data.categoria,
                    formacaoNome: response.data.formacao?.nome || ''
                });
            } catch (error) {
                console.error('Erro ao buscar equipe sombra:', error);
            }
        };

        if (isOpen && teamId) {
            fetchTeamData();
        }
    }, [isOpen, teamId]);

    // Função para editar a equipe sombra
    const editShadowTeam = async () => {
        try {
            // Exibe a SweetAlert de confirmação antes de editar
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você deseja salvar as alterações feitas nesta equipe sombra?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, salvar!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const response = await axios.put(`https://localhost:3000/equipeSombra/${teamId}/Nome`, teamData);
                console.log('Equipe sombra editada:', response.data);
                onUpdate(response.data); // Passa os dados atualizados para o componente pai
                onClose(); // Fecha a modal após a edição

                Swal.fire(
                    'Atualizado!',
                    'A equipe sombra foi atualizada com sucesso.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Erro ao editar equipe sombra:', error);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao tentar editar a equipe sombra.',
                'error'
            );
        }
    };

    // Se a modal não estiver aberta, não renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlayES">
            <div className="modal-contentES">
                <h3>Editar Equipa Sombra</h3>
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
                <select
                    value={teamData.categoria}
                    onChange={(e) => setTeamData({ ...teamData, categoria: e.target.value })}
                    className="input-fieldES"
                >
                    <option value="" disabled>Selecione uma categoria</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={teamData.formacaoNome}
                    onChange={(e) => setTeamData({ ...teamData, formacaoNome: e.target.value })}
                    className="input-fieldES"
                >
                    <option value="" disabled>Selecione uma formação</option>
                    {formations.map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                    ))}
                </select>
                <div className="modal-actionsES">
                    <button className="button-createAT button-createES" onClick={editShadowTeam}>Salvar</button>
                    <button className="button-cancelES" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default EditShadowTeamModal;
