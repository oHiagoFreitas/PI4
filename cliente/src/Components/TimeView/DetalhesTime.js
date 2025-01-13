import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/AtletasView/DetalhesAtleta.css"; // Estilos
import Swal from 'sweetalert2'; // Importando SweetAlert

function DetalhesTime() {
    const { id } = useParams(); // Obtém o ID do time da URL
    const [time, setTime] = useState(null); // Estado para armazenar os dados do time
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros
    const navigate = useNavigate(); // Inicializa o hook de navegação

    // Carregar os detalhes do time
    useEffect(() => {
        console.log("ID do time:", id); // Verifique se o ID está sendo passado
        axios
            .get(`http://localhost:3000/times/${id}`) // A URL para carregar os detalhes do time específico
            .then((response) => {
                console.log("Time carregado:", response.data); // Verifique a resposta do backend
                setTime(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Erro ao carregar o time:", error); // Para depuração
                setError("Erro ao carregar os detalhes do time.");
                setLoading(false);
                // Exibir SweetAlert de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Não foi possível carregar os detalhes do time.',
                });
            });
    }, [id]);

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);

        setUserRole(role); // Atualiza o estado
    }, []);

    return (
        <div className="backoffice-container">
            <Sidebar userRole={userRole}/>
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    {loading && <p>Carregando...</p>}
                    {error && <p>{error}</p>}
                    {time && (
                        <div className="detalhes-timeAD">
                            <div className="headerAD">
                                <h1>Detalhe do Clube: {time.nome || "Nome não disponível"}</h1>
                            </div>

                            <div style={{ display: 'flex', marginBottom: '0px' }}>
                                <p style={{ color: 'Black', marginRight: '4px', marginBottom: '0px' }}>
                                    Criado em: {new Date(time.createdAt).toLocaleDateString()} <strong>|</strong>
                                </p>
                                <p style={{ color: 'Black', marginBottom: '0px' }}>
                                    Última atualização: {new Date(time.updatedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="sectionAD informacoesAD">
                                <div><strong>Clube:</strong> {time.nome || "Nome não disponível"}</div>
                                <div><strong>País:</strong> {time.pais || "Endereço não disponível"}</div>
                                <div><strong>Categoria:</strong> {time.categoria || "Categoria não disponível"}</div>
                                <div><strong>Descrição:</strong> {time.descricao || "Descrição não disponível"}</div>
                            </div>

                            <div className="button-containerAD">
                                <button onClick={() => navigate(-1)} className="back-buttonAD">
                                    Voltar
                                </button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetalhesTime;
