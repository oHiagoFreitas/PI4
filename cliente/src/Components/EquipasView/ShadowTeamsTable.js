import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditShadowTeamModal from './EditShadowTeamModal'; // Importando a modal de edição
import CreateShadowTeamModal from './CreateShadowTeamModal'; // Importando a modal de criação
import Pagination from '../Pagination'; // Importando o componente de paginação
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação
import Swal from 'sweetalert2'; // Importando o SweetAlert

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

    const handleDelete = async (id) => {
        try {
            // Exibe a SweetAlert de confirmação antes de deletar
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá recuperar esta equipe sombra após deletá-la!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, delete-a!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/equipeSombra/${id}`);
                setAllShadowTeams(allShadowTeams.filter(team => team.id !== id));

                Swal.fire(
                    'Deletado!',
                    'A equipe sombra foi deletada com sucesso.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Erro ao deletar a equipe sombra:', error);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao tentar deletar a equipe sombra.',
                'error'
            );
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            // Exibe a SweetAlert de confirmação antes de atualizar
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
                const response = await axios.put(`http://localhost:3000/equipeSombra/${id}`, updatedData);
                setAllShadowTeams(prevTeams =>
                    prevTeams.map(team =>
                        team.id === id ? response.data : team
                    )
                );

                Swal.fire(
                    'Atualizado!',
                    'A equipe sombra foi atualizada com sucesso.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Erro ao atualizar a equipe sombra:', error);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao tentar atualizar a equipe sombra.',
                'error'
            );
        }
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

                                        <div style={{marginLeft: "10px", display: "inline"}}>
                                            <button
                                                className="action-buttonES"
                                                onClick={() => handleDelete(team.id)} // Função para deletar a equipe sombra
                                            >
                                                Deletar
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
                onUpdate={(updatedTeam) => handleUpdate(editingTeamId, updatedTeam)} // Usando a função de atualização com SweetAlert
            />
        </div>
    );
}

export default ShadowTeamsTable;
