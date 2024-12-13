import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import MostrarEquipePrincipal from "./TitleMostrarEquipePrincipal";
import CampoFutebol from "../MostrarCampoFutebol";
import TabelaJogadores from "../MostrarTabelaJogadores";
import Swal from 'sweetalert2';
import "../../../Style/EquipaSombra.css";

function MostrarEquipeComJogadores() {
    const navigate = useNavigate();
    const { id: equipePrincipalId } = useParams();
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
        if (!equipePrincipalId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Equipe principal não encontrada.',
            });
        }
    }, [equipePrincipalId, navigate]);

    useEffect(() => {
        if (equipePrincipalId) {
            setLoading(true);
            // Carregar a formação da equipe principal
            fetch(`http://localhost:3000/equipePrincipal/${equipePrincipalId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.formacao) {
                        setFormacao(data.formacao.nome); // Definir a formação no estado
                    } else {
                        console.error("Formação não encontrada para a equipe:", equipePrincipalId);
                    }
                })
                .catch(error => console.error("Erro ao carregar formação:", error));

            fetch(`http://localhost:3000/equipePrincipal/${equipePrincipalId}/atletas`)
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
    }, [equipePrincipalId, ratings]);

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

    const showEquipePrincipalId = () => {
        if (equipePrincipalId) {
            Swal.fire({
                title: 'ID da Equipe Principal',
                text: `O ID da equipe principal é: ${equipePrincipalId}`,
                icon: 'info',
            });
        } else {
            Swal.fire({
                title: 'ID da Equipe Principal',
                text: 'Nenhuma equipe principal selecionada.',
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
                        <MostrarEquipePrincipal />

                        {loading ? (
                            <div className="loading-spinner">Carregando...</div>
                        ) : (
                            <CampoFutebol positions={positions} formacao={formacao} /> // Passa a formação como uma nova prop para o CampoFutebol
                        )}

                        <div className="actions-buttonsAT" style={{ justifyContent: "start", marginTop: 20 }}>
                            <button
                                className="button-createAT"
                                onClick={() => navigate(`/editar-equipePrincipal/${equipePrincipalId}`)}
                            >
                                Editar Equipe
                            </button>

                            <button onClick={() => navigate(-1)} className="button-createAT">Voltar</button>
                        </div>

                        <TabelaJogadores
                            positions={positions}
                            ratings={ratings}
                        />

                        {/* Botão para exibir o ID da equipe principal */}
                        <button onClick={showEquipePrincipalId} className="btn-show-id">
                            Mostrar ID da Equipe Principal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostrarEquipeComJogadores;
