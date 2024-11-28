import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para fazer as requisições HTTP
import CreateShadowTeamModal from './CreateShadowTeamModal'; // Importando o componente da modal
import { useNavigate } from 'react-router-dom'; // Atualizando para usar useNavigate

function ShadowTeamsTable() {
    // Estado para armazenar as equipas sombras
    const [shadowTeams, setShadowTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a modal
    const navigate = useNavigate(); // Hook de navegação

    // Função para buscar todas as equipas sombras
    const fetchShadowTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3000/equipeSombra');
            setShadowTeams(response.data);
        } catch (error) {
            console.error('Erro ao buscar equipes sombra:', error);
        }
    };

    // Função para abrir a modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Função para fechar a modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Função para adicionar a nova equipa na lista após criação e redirecionar para a página de criação de equipe com jogadores
    const handleCreateShadowTeam = (newTeam) => {
        setShadowTeams([...shadowTeams, newTeam]);
        // Redireciona para a página de criação de equipe com jogadores, passando o id da equipe
        navigate(`/equipeSombra/${newTeam.id}`);
    };

    // Efeito para carregar as equipas sombras quando o componente for montado
    useEffect(() => {
        fetchShadowTeams();
    }, []);

    return (
        <div className="shadow-teams-tableES">
            <div className="table-container">
                <table className="usuarios-tableAAT table table-striped">
                    <thead>
                        <tr>
                            <th>Nome da Equipa</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shadowTeams.map(team => (
                            <tr key={team.id}>
                                <td>{team.nome}</td>
                                <td>{team.categoria}</td>
                                <td>{team.descricao}</td>
                                <td>
                                    {/* Ações, como visualizar ou editar podem ser adicionadas aqui */}
                                    <button
                                        className="action-buttonES"
                                        onClick={() => {
                                            console.log("ID da equipe sombra:", team.id); // Verifique o ID
                                            
                                            // Armazena o ID da equipe sombra no localStorage
                                            localStorage.setItem('equipeSombraId', team.id);

                                            // Redireciona para a página de detalhes da equipe sombra
                                            navigate(`/MostrarequipeSombra/${team.id}`);
                                        }}
                                    >
                                        Ver Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="actions-buttonsAT">
                <button className="button-createAT button-createES" onClick={openModal}>
                    Criar Equipa Sombra
                </button>
            </div>

            {/* Modal de criação de equipa sombra */}
            <CreateShadowTeamModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCreate={handleCreateShadowTeam}
            />
        </div>
    );
}

export default ShadowTeamsTable;
