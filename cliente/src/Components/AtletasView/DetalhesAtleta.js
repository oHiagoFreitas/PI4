import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AtletasName from "../AtletasView/AtletasName";
import AtletasInfo from "../AtletasView/AtletasInfo";
import AtletasClube from "../AtletasView/AtletasClube";
import AtletasAvaliacao from "../AtletasView/AtletasAvaliacao";
import AtletasAgente from "../AtletasView/AtletasAgente";
import ExportarPDFButton from "../AtletasView/ExportarPDFButton";
import HistoricoRelatorios from "../AtletasView/HistoricoRelatorios";
import "../../Style/AtletasView/DetalhesAtleta.css";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Importando biblioteca para Excel

function DetalhesAtleta() {
    const { id } = useParams();
    const [atleta, setAtleta] = useState(null);
    const [relatorios, setRelatorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/atletas/${id}`)
            .then((response) => {
                setAtleta(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes do atleta.");
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Não foi possível carregar os detalhes do atleta.',
                });
            });
    }, [id]);

    useEffect(() => {
        const scoutId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        console.log('Scout ID no localStorage:', scoutId);
        console.log('Role do utilizador no localStorage:', role);
        setUserRole(role);
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/relatorios/atleta/${id}`)
            .then((response) => {
                setRelatorios(response.data);
            })
            .catch((error) => {
                setError();
                console.error(error);
            });
    }, [id]);

    // Função para exportar dados do atleta e relatórios para Excel
    const exportToExcel = () => {
        const atletaData = [
            ['Nome', atleta.nome],
            ['Posição', atleta.posicao],
            ['Nacionalidade', atleta.nacionalidade],
            ['Clube', atleta.clube || 'N/A'],
            ['Avaliação', atleta.ratingFinal || 'N/A'],
            ['Criado em', new Date(atleta.createdAt).toLocaleDateString()],
            ['Última atualização', new Date(atleta.updatedAt).toLocaleDateString()],
        ];

        const relatoriosData = relatorios.map((relatorio) => [
            relatorio.titulo,
            relatorio.descricao,
            new Date(relatorio.createdAt).toLocaleDateString(),
        ]);

        const atletaHeaders = ['Detalhe', 'Valor'];
        const relatoriosHeaders = ['Título', 'Descrição', 'Criado em'];

        const worksheetAtleta = XLSX.utils.aoa_to_sheet([atletaHeaders, ...atletaData]);
        const worksheetRelatorios = XLSX.utils.aoa_to_sheet([relatoriosHeaders, ...relatoriosData]);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetAtleta, 'Detalhes Atleta');
        XLSX.utils.book_append_sheet(workbook, worksheetRelatorios, 'Relatórios');

        XLSX.writeFile(workbook, `atleta_${atleta.nome}.xlsx`);
    };

    return (
        <div className="backoffice-container">
            <Sidebar userRole={userRole} />
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
                                <button onClick={exportToExcel} className="export-buttonAD" style={{ backgroundColor: "green"}}>
                                    Exportar para Excel
                                </button>
                                <button onClick={() => navigate(-1)} className="back-buttonAD">
                                    Voltar
                                </button>
                            </div>

                            <HistoricoRelatorios relatorios={relatorios} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetalhesAtleta;
