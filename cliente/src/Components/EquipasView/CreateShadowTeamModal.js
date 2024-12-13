import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adicionado para gerenciar o redirecionamento
import Swal from 'sweetalert2'; // Importando o SweetAlert

function CreateShadowTeamModal({ isOpen, onClose, onCreate }) {
    const [newTeam, setNewTeam] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        formacaoNome: ''
    });
    const navigate = useNavigate(); // Hook para navegação

    const formations = ["4-3-3", "4-4-2", "4-2-3-1"]; // Lista de opções de formação

    const createShadowTeam = async () => {
        try {
            const response = await axios.post('http://localhost:3000/equipeSombra', newTeam);
            console.log('Nova equipa sombra criada:', response.data);
            onCreate(response.data); // Passa a nova equipa criada para o componente pai
            navigate(`/equipeSombra/${response.data.id}`); // Redireciona para a rota com o ID da nova equipa
            onClose(); // Fecha a modal após a criação

            // Exibe SweetAlert de sucesso
            Swal.fire({
                title: 'Sucesso',
                text: 'Equipe sombra criada com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Erro ao criar equipa sombra:', error);

            // Exibe SweetAlert de erro
            Swal.fire({
                title: 'Erro',
                text: 'Houve um problema ao criar a equipe sombra.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

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
                <select 
                    value={newTeam.formacaoNome} 
                    onChange={(e) => setNewTeam({ ...newTeam, formacaoNome: e.target.value })}
                    className="input-fieldES"
                >
                    <option value="" disabled>Selecione uma formação</option>
                    {formations.map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                    ))}
                </select>
                <div className="modal-actionsES">
                    <button className="button-createAT button-createES" onClick={createShadowTeam}>Criar</button>
                    <button className="button-cancelES" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default CreateShadowTeamModal;
