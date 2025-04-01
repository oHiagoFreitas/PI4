import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar2";
import Navbar from "../../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AtletasName from "../../AtletasView/AtletasName"; // Componente para o nome do atleta
import AtletasInfo from "../../AtletasView/AtletasInfo";
import AtletasClube from "../../AtletasView/AtletasClube";
import AtletasAvaliacao from "../../AtletasView/AtletasAvaliacao";
import AtletasAgente from "../../AtletasView/AtletasAgente";
import ExportarPDFButton from "../../AtletasView/ExportarPDFButton";
import HistoricoRelatorios from "../../AtletasView/HistoricoRelatorios";
import "../../../Style/AtletasView/DetalhesAtleta.css"; // Estilos

import Swal from 'sweetalert2'; // Importando SweetAlert

function DetalhesAtleta() {
    const { id } = useParams(); // Obtém o ID do atleta da URL
    const [atleta, setAtleta] = useState(null); // Estado para armazenar os dados do atleta
    const [relatorios, setRelatorios] = useState([]); // Estado para armazenar os relatórios
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros
    const navigate = useNavigate(); // Inicializa o hook de navegação

    // Carregar os detalhes do atleta
    useEffect(() => {
        axios
            .get(`https://localhost:3000/atletas/${id}`)
            .then((response) => {
                setAtleta(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes do atleta.");
                setLoading(false);
                // Exibir SweetAlert de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Não foi possível carregar os detalhes do atleta.',
                });
            });
    }, [id]);

    // Carregar todos os relatórios associados ao atleta
    useEffect(() => {
        axios
            .get(`https://localhost:3000/relatorios/atleta/${id}`) // A URL correta para obter todos os relatórios do atleta
            .then((response) => {
                setRelatorios(response.data); // Armazenar todos os relatórios
            })
            .catch((error) => {
                setError();
                console.error(error); // Para depuração
            });
    }, [id]);

    return (
        <div className="backoffice-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    {loading && <p>Carregando...</p>}
                    {error && <p>{error}</p>}
                    {atleta && (
                        <div className="detalhes-atletaAD">
                            <div className="headerAD">
                                <AtletasName atleta={atleta} />
                            </div>

                            <div style={{ display: 'flex', marginBottom: '0px' }}>
                                <p style={{ color: 'Black', marginRight: '4px', marginBottom: '0px' }}>
                                    Criado em: {new Date(atleta.createdAt).toLocaleDateString()} <strong>|</strong>
                                </p>
                                <p style={{ color: 'Black', marginBottom: '0px' }}>
                                    Última atualização: {new Date(atleta.updatedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="informacoesAD">
                                <AtletasInfo atleta={atleta} />
                                <AtletasClube atleta={atleta} />
                                <AtletasAvaliacao atleta={atleta} />
                                <AtletasAgente atleta={atleta} />
                            </div>

                            <div className="button-containerAD">
                                <ExportarPDFButton atleta={atleta} relatorios={relatorios} />
                                <button onClick={() => navigate(-1)} className="back-buttonAD">
                                    Voltar
                                </button>

                            </div>

                            {/* Passando os relatórios para o componente HistoricoRelatorios */}
                            <HistoricoRelatorios relatorios={relatorios} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetalhesAtleta;
