import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditShadowTeamModal from './EditShadowTeamModal'; // Importando a modal de edição
import CreateShadowTeamModal from './CreateShadowTeamModal'; // Importando a modal de criação
import Pagination from '../Pagination'; // Importando o componente de paginação
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação

function ShadowTeamsTable() {
    const [allShadowTeams, setAllShadowTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado da modal de edição
    const [editingTeamId, setEditingTeamId] = useState(null); // ID da equipe sendo editada
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado da modal de criação
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Usando hook para navegação

    const fetchShadowTeams = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/equipeSombra');
            setAllShadowTeams(response.data);
        } catch (error) {
            console.error('Erro ao buscar equipes sombra:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShadowTeams();
    }, []);

    const getCurrentPageData = () => {
        const indexOfLast = currentPage * itemsPerPage;
        const indexOfFirst = indexOfLast - itemsPerPage;
        return allShadowTeams.slice(indexOfFirst, indexOfLast);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                        {loading ? (
                            <tr><td colSpan="4">Carregando...</td></tr>
                        ) : (
                            getCurrentPageData().map(team => (
                                <tr key={team.id}>
                                    <td>{team.nome}</td>
                                    <td>{team.categoria}</td>
                                    <td>{team.descricao}</td>
                                    <td>
                                        {/* Botão de "Ver Detalhes" */}
                                        <button
                                            className="action-buttonES"
                                            onClick={() => {
                                                // Redireciona para a página de detalhes da equipe
                                                navigate(`/MostrarequipeSombra/${team.id}`);
                                            }}
                                        >
                                            Ver Detalhes
                                        </button>

                                        <div style={{marginLeft: "10px", display: "inline"}}>
                                            <button
                                                className="action-buttonES"
                                                onClick={() => {
                                                    setEditingTeamId(team.id);
                                                    setIsEditModalOpen(true); // Abre a modal de edição
                                                }}
                                            >
                                                Editar Time
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="actions-buttonsAT">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(allShadowTeams.length / itemsPerPage)}
                    paginate={paginate}
                />
                {/* Botão para criar nova equipe sombra */}
                <button className="button-createAT button-createES" onClick={() => setIsCreateModalOpen(true)}>
                    Criar Equipa Sombra
                </button>
            </div>

            {/* Modal de criação de equipe sombra */}
            <CreateShadowTeamModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(newTeam) => {
                    setAllShadowTeams([...allShadowTeams, newTeam]);
                }}
            />

            {/* Modal de edição de equipe sombra */}
            <EditShadowTeamModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                teamId={editingTeamId}
                onUpdate={(updatedTeam) => {
                    setAllShadowTeams(prevTeams =>
                        prevTeams.map(team =>
                            team.id === updatedTeam.id ? updatedTeam : team
                        )
                    );
                }}
            />
        </div>
    );
}

export default ShadowTeamsTable;
