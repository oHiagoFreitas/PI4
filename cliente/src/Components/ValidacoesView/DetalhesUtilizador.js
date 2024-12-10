import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/AtletasView/DetalhesAtleta.css"; // Estilos
import Swal from 'sweetalert2'; // Importando SweetAlert

function DetalhesUtilizador() {
    const { id } = useParams(); // Obtém o ID do utilizador da URL
    const [utilizador, setUtilizador] = useState(null); // Estado para armazenar os dados do utilizador
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros
    const navigate = useNavigate(); // Inicializa o hook de navegação

    // Carregar os detalhes do utilizador
    useEffect(() => {
        console.log("ID do utilizador:", id); // Verifique se o ID está sendo passado
        axios
            .get(`http://localhost:3000/utilizadores/${id}`) // A URL para carregar os detalhes do utilizador específico
            .then((response) => {
                console.log("Utilizador carregado:", response.data); // Verifique a resposta do backend
                setUtilizador(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Erro ao carregar o utilizador:", error); // Para depuração
                setError("Erro ao carregar os detalhes do utilizador.");
                setLoading(false);
                // Exibir SweetAlert de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Não foi possível carregar os detalhes do utilizador.',
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
                    {utilizador && (
                        <div className="detalhes-utilizadorAD">
                            <div className="headerAD">
                                <h1>Detalhes do Utilizador: {utilizador.nome}</h1>
                            </div>

                            <div style={{ display: 'flex', marginBottom: '0px' }}>
                                <p style={{ color: 'Black', marginRight: '4px', marginBottom: '0px' }}>
                                    Criado em: {new Date(utilizador.createdAt).toLocaleDateString()} <strong>|</strong>
                                </p>
                                <p style={{ color: 'Black', marginBottom: '0px' }}>
                                    Última atualização: {new Date(utilizador.updatedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="sectionAD informacoesAD">
                                <div><strong>Nome:</strong> {utilizador.nome}</div>
                                <div><strong>Email:</strong> {utilizador.email}</div>
                                <div><strong>Data de nascimento:</strong> {new Date(utilizador.dataNascimento).toLocaleDateString()}</div>
                                <div><strong>Telefone:</strong> {utilizador.telefone}</div>
                                <div><strong>Endereço:</strong> {utilizador.endereco}</div>
                                <div><strong>Função:</strong> {utilizador.funcao}</div>
                                <div><strong>Status:</strong> {utilizador.status}</div>
                            </div>

                            <div className="button-containerAD">
                                <button onClick={() => navigate("/utilizadores")} className="back-buttonAD">
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

export default DetalhesUtilizador;
