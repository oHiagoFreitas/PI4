import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import MostrarEquipeSombra from "./MostrarEquipeSombra";
import CampoFutebol from "./MostrarCampoFutebol";
import TabelaJogadores from "./MostrarTabelaJogadores";
import Swal from 'sweetalert2';
import "../../Style/EquipaSombra.css";

function MostrarEquipeComJogadores() {
    const navigate = useNavigate();
    const { id: equipeSombraId } = useParams();
    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState({});
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(false);
    const [formacao, setFormacao] = useState(""); // Novo estado para armazenar a formação
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);

        setUserRole(role); // Atualiza o estado
    }, []);

    useEffect(() => {
        if (!equipeSombraId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Equipe sombra não encontrada.',
            });
        }
    }, [equipeSombraId, navigate]);

    // Função para carregar a formação da equipe sombra específica
    useEffect(() => {
        if (equipeSombraId) {
            setLoading(true);
            fetch(`http://localhost:3000/equipeSombra/${equipeSombraId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.formacao) {
                        setFormacao(data.formacao.nome); // Definir a formação no estado
                    } else {
                        console.error("Formação não encontrada para a equipe:", equipeSombraId);
                    }
                })
                .catch(error => console.error("Erro ao carregar formação:", error));

            fetch(`http://localhost:3000/equipeSombra/${equipeSombraId}/atletas`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Erro ao carregar jogadores da equipe.',
                        });
                    } else {
                        // Atualiza as posições com os jogadores da equipe, usando o nome da posição
                        const initialPositions = {};
                        data.forEach(jogador => {
                            initialPositions[jogador.posicao] = {
                                id: jogador.id,
                                nome: jogador.nome,
                                rating: ratings[jogador.id] || "N/A",
                            };
                        });
                        setPositions(initialPositions);
                    }
                })
                .catch(error => console.error("Erro ao carregar jogadores da equipe:", error))
                .finally(() => setLoading(false));
        }
    }, [equipeSombraId, ratings]);

    // Função para carregar todos os jogadores disponíveis e os ratings
    useEffect(() => {
        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));

        fetch("http://localhost:3000/relatorios")
            .then(response => response.json())
            .then(data => {
                const ratingsMap = data.reduce((acc, report) => {
                    acc[report.atletaId] = report.ratingFinal;
                    return acc;
                }, {});
                setRatings(ratingsMap);
            })
            .catch(error => console.error("Erro ao carregar relatórios:", error));
    }, []);

    // Função para exibir o ID da equipe sombra
    const showEquipeSombraId = () => {
        if (equipeSombraId) {
            Swal.fire({
                title: 'ID da Equipe Sombra',
                text: `O ID da equipe sombra é: ${equipeSombraId}`,
                icon: 'info',
            });
        } else {
            Swal.fire({
                title: 'ID da Equipe Sombra',
                text: 'Nenhuma equipe sombra selecionada.',
                icon: 'warning',
            });
        }
    };

    return (
        <div className="backoffice-container">
            <Sidebar userRole={userRole}/>
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <div className="criar-equipe-container">
                        <MostrarEquipeSombra />

                        {loading ? (
                            <div className="loading-spinner">Carregando...</div>
                        ) : (
                            <CampoFutebol positions={positions} formacao={formacao} />
                        )}

                        <div className="actions-buttonsAT" style={{ justifyContent: "start", marginTop: 20 }}>
                            <button
                                className="button-createAT"
                                onClick={() => navigate(`/editar-equipe/${equipeSombraId}`)}
                            >
                                Editar Equipe
                            </button>

                            <button onClick={() => navigate(-1)} className="button-createAT">Voltar</button>
                        </div>

                        <TabelaJogadores
                            positions={positions}
                            ratings={ratings}
                        />

                        {/* Botão para exibir o ID da equipe sombra */}
                        <button onClick={showEquipeSombraId} className="btn-show-id">
                            Mostrar ID da Equipe Sombra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostrarEquipeComJogadores;
