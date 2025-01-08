import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf"; // Importando a biblioteca jsPDF
import "jspdf-autotable"; // Importando a extensão de tabelas para jsPDF
import "../../Style/AtletasView/DetalhesAtleta.css"; // Estilos
import Swal from 'sweetalert2'; // Importando SweetAlert

function DetalhesRelatorio() {
  const { id } = useParams(); // Obtém o ID do relatório da URL
  const [relatorio, setRelatorio] = useState(null); // Estado para armazenar os dados do relatório
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Carregar os detalhes do relatório
  useEffect(() => {
    console.log("ID do relatório:", id); // Verifique se o ID está sendo passado
    axios
      .get(`http://localhost:3000/relatorios/${id}`) // A URL para carregar o relatório específico
      .then((response) => {
        console.log("Relatório carregado:", response.data); // Verifique a resposta do backend
        setRelatorio(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao carregar o relatório:", error); // Para depuração
        setError("Erro ao carregar os detalhes do relatório.");
        setLoading(false);
        // Exibir SweetAlert de erro
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível carregar os detalhes do relatório.',
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

  // Função para exportar o relatório como PDF
  const exportRelatorioToPDF = () => {
    const doc = new jsPDF();

    // Adicionando título
    doc.setFontSize(18);
    doc.text('Detalhes do Relatório', 20, 20);

    // Adicionando o nome do atleta
    doc.setFontSize(14);
    doc.text(`Atleta: ${relatorio.atleta.nome}`, 20, 40);

    // Adicionando os detalhes do relatório
    doc.setFontSize(12);
    doc.text(`Nome do Scout: ${relatorio.utilizador.nome}`, 20, 50);
    doc.text(`Atitude Competitiva: ${relatorio.atitudeCompetitiva}`, 20, 60);
    doc.text(`Técnica: ${relatorio.tecnica}`, 20, 70);
    doc.text(`Velocidade: ${relatorio.velocidade}`, 20, 80);
    doc.text(`Inteligência: ${relatorio.inteligencia}`, 20, 90);
    doc.text(`Altura: ${relatorio.altura}`, 20, 100);
    doc.text(`Morfologia: ${relatorio.morfologia}`, 20, 110);
    doc.text(`Rating Final: ${relatorio.ratingFinal}`, 20, 120);
    doc.text(`Comentário: ${relatorio.comentario}`, 20, 130);

    // Adicionando data de criação e atualização
    doc.text(`Criado em: ${new Date(relatorio.createdAt).toLocaleDateString()}`, 20, 140);
    doc.text(`Última atualização: ${new Date(relatorio.updatedAt).toLocaleDateString()}`, 20, 150);

    // Gerando o PDF
    doc.save(`relatorio_${relatorio.id}.pdf`);
  };

  return (
    <div className="backoffice-container">
      <Sidebar userRole={userRole} />
      <div className="main-content">
        <Navbar />
        <div className="sub-main-content">
          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}
          {relatorio && (
            <div className="detalhes-relatorioAD">
              <div className="headerAD">
                <h1>Detalhes do Relatório de {relatorio.atleta.nome}</h1>
              </div>

              <div style={{ display: 'flex', marginBottom: '0px' }}>
                <p style={{ color: 'Black', marginRight: '4px', marginBottom: '0px' }}>
                  Criado em: {new Date(relatorio.createdAt).toLocaleDateString()} <strong>|</strong>
                </p>
                <p style={{ color: 'Black', marginBottom: '0px' }}>
                  Última atualização: {new Date(relatorio.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="sectionAD informacoesAD">
                <div><strong>Nome do Scout:</strong> {relatorio.utilizador.nome}</div>
                <div><strong>Atitude Competitiva:</strong> {relatorio.atitudeCompetitiva}</div>
                <div><strong>Técnica:</strong> {relatorio.tecnica}</div>
                <div><strong>Velocidade:</strong> {relatorio.velocidade}</div>
                <div><strong>Inteligência:</strong> {relatorio.inteligencia}</div>
                <div><strong>Altura:</strong> {relatorio.altura}</div>
                <div><strong>Morfologia:</strong> {relatorio.morfologia}</div>
                <div><strong>Rating Final:</strong> {relatorio.ratingFinal}</div>
                <div><strong>Comentário:</strong> {relatorio.comentario}</div>
              </div>

              <div className="button-containerAD">
                <button onClick={() => navigate(-1)} className="back-buttonAD">
                  Voltar
                </button>

                {/* Botão para exportar o relatório como PDF */}
                <button onClick={exportRelatorioToPDF} className="export-pdf-buttonAD">
                  Exportar como PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesRelatorio;
