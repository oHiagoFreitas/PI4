import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditMainTeamModal from './EditMainTeamModal'; // Importando a modal de edição
import CreateMainTeamModal from './CreateMainTeamModal'; // Importando a modal de criação
import Pagination from '../../Pagination'; // Importando o componente de paginação
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação

function MainTeamList() {
    const [allMainTeams, setAllMainTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado da modal de edição
    const [editingTeamId, setEditingTeamId] = useState(null); // ID da equipe sendo editada
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado da modal de criação
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Usando hook para navegação

    const fetchMainTeams = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/equipePrincipal');
            setAllMainTeams(response.data);
        } catch (error) {
            console.error('Erro ao buscar equipes principais:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMainTeams();
    }, []);

    const getCurrentPageData = () => {
        const indexOfLast = currentPage * itemsPerPage;
        const indexOfFirst = indexOfLast - itemsPerPage;
        return allMainTeams.slice(indexOfFirst, indexOfLast);
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
                                                navigate(`/MostrarequipePrincipal/${team.id}`);
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
                    totalPages={Math.ceil(allMainTeams.length / itemsPerPage)}
                    paginate={paginate}
                />
                {/* Botão para criar nova equipe principal */}
                <button className="button-createAT button-createES" onClick={() => setIsCreateModalOpen(true)}>
                    Criar Equipa Principal
                </button>
            </div>

            {/* Modal de criação de equipe principal */}
            <CreateMainTeamModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(newTeam) => {
                    setAllMainTeams([...allMainTeams, newTeam]);
                }}
            />

            {/* Modal de edição de equipe principal */}
            <EditMainTeamModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                teamId={editingTeamId}
                onUpdate={(updatedTeam) => {
                    setAllMainTeams(prevTeams =>
                        prevTeams.map(team =>
                            team.id === updatedTeam.id ? updatedTeam : team
                        )
                    );
                }}
            />
        </div>
    );
}

export default MainTeamList;
