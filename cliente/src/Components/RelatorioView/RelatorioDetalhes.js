import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Importando biblioteca para Excel
import "../../Style/AtletasView/DetalhesAtleta.css";

function DetalhesRelatorio() {
  const { id } = useParams();
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:3000/relatorios/${id}`)
      .then((response) => {
        setRelatorio(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar os detalhes do relatório.");
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível carregar os detalhes do relatório.",
        });
      });
  }, [id]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Função para exportar o relatório como PDF
  const exportRelatorioToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Detalhes do Relatório", 20, 20);
    doc.setFontSize(14);
    doc.text(`Atleta: ${relatorio.atleta.nome}`, 20, 40);

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

    doc.text(`Criado em: ${new Date(relatorio.createdAt).toLocaleDateString()}`, 20, 140);
    doc.text(`Última atualização: ${new Date(relatorio.updatedAt).toLocaleDateString()}`, 20, 150);

    doc.save(`relatorio_${relatorio.id}.pdf`);
  };

  // Função para exportar o relatório como Excel
  const exportRelatorioToExcel = () => {
    const data = [
      ["Atributo", "Valor"],
      ["Nome do Scout", relatorio.utilizador.nome],
      ["Atleta", relatorio.atleta.nome],
      ["Atitude Competitiva", relatorio.atitudeCompetitiva],
      ["Técnica", relatorio.tecnica],
      ["Velocidade", relatorio.velocidade],
      ["Inteligência", relatorio.inteligencia],
      ["Altura", relatorio.altura],
      ["Morfologia", relatorio.morfologia],
      ["Rating Final", relatorio.ratingFinal],
      ["Comentário", relatorio.comentario],
      ["Criado em", new Date(relatorio.createdAt).toLocaleDateString()],
      ["Última atualização", new Date(relatorio.updatedAt).toLocaleDateString()],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, `relatorio_${relatorio.id}.xlsx`);
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

              <div style={{ display: "flex", marginBottom: "0px" }}>
                <p style={{ color: "Black", marginRight: "4px", marginBottom: "0px" }}>
                  Criado em: {new Date(relatorio.createdAt).toLocaleDateString()} <strong>|</strong>
                </p>
                <p style={{ color: "Black", marginBottom: "0px" }}>
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

                {/* Botões para exportar como PDF e Excel */}
                <button onClick={exportRelatorioToPDF} className="export-buttonAD">
                  Exportar como PDF
                </button>
                <button onClick={exportRelatorioToExcel} className="export-buttonAD" style={{backgroundColor: "green"}}>
                  Exportar como Excel
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
