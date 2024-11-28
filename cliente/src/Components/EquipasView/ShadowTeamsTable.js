import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para fazer as requisições HTTP
import CreateShadowTeamModal from './CreateShadowTeamModal'; // Importando o componente da modal
import { useNavigate } from 'react-router-dom'; // Atualizando para usar useNavigate
import Pagination from '../Pagination'; // Importando o componente de paginação

function ShadowTeamsTable() {
    // Estado para armazenar todas as equipas sombras
    const [allShadowTeams, setAllShadowTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [itemsPerPage] = useState(10); // Número de itens por página
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a modal
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const navigate = useNavigate(); // Hook de navegação

    // Função para buscar todas as equipas sombras
    const fetchShadowTeams = async () => {
        setLoading(true); // Ativa o carregamento
        try {
            const response = await axios.get('http://localhost:3000/equipeSombra');
            setAllShadowTeams(response.data); // Armazena todos os dados
        } catch (error) {
            console.error('Erro ao buscar equipes sombra:', error);
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    };

    // Função para obter os dados da página atual
    const getCurrentPageData = () => {
        const indexOfLast = currentPage * itemsPerPage; // Último índice da página
        const indexOfFirst = indexOfLast - itemsPerPage; // Primeiro índice da página
        return allShadowTeams.slice(indexOfFirst, indexOfLast); // Pega os dados da página
    };

    // Função para mudar a página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        {loading ? (
                            <tr><td colSpan="4">Carregando...</td></tr>
                        ) : (
                            getCurrentPageData().map(team => (
                                <tr key={team.id}>
                                    <td>{team.nome}</td>
                                    <td>{team.categoria}</td>
                                    <td>{team.descricao}</td>
                                    <td>
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
                <button className="button-createAT button-createES" onClick={() => setIsModalOpen(true)}>
                    Criar Equipa Sombra
                </button>
            </div>

            {/* Modal de criação de equipa sombra */}
            <CreateShadowTeamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={(newTeam) => {
                    setAllShadowTeams([...allShadowTeams, newTeam]);
                    navigate(`/equipeSombra/${newTeam.id}`);
                }}
            />
        </div>
    );
}

export default ShadowTeamsTable;
