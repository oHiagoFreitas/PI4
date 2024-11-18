import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ExportarPDFButton({ atleta, relatorios }) {
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Perfil do Atleta", 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Nome: ${atleta.nome}`, 14, 30);
    doc.text(`Data de Nascimento: ${new Date(atleta.dataNascimento).toLocaleDateString()}`, 14, 36);
    doc.text(`Nacionalidade: ${atleta.nacionalidade}`, 14, 42);
    doc.text(`Posição: ${atleta.posicao}`, 14, 48);
    doc.text(`Clube: ${atleta.clube}`, 14, 54);
    doc.text(`Plantel: ${atleta.plantel}`, 14, 60);
    doc.text(`Rating: ${atleta.rating}`, 14, 66);
    doc.text(`Agente: ${atleta.agente}`, 14, 72);
    doc.text(`Contato do Agente: ${atleta.contactoAgente}`, 14, 78);
    doc.text(`Link: ${atleta.link}`, 14, 84);

    if (relatorios.length > 0) {
      doc.addPage();
      doc.text("Histórico de Relatórios", 14, 22);

      const columns = ["Data de Criação", "Utilizador", "Rating", "Comentários"];
      const data = relatorios.map((relatorio) => [
        new Date(relatorio.createdAt).toLocaleDateString(),
        relatorio.utilizador || "Não disponível",
        relatorio.ratingFinal,
        relatorio.comentario,
      ]);

      doc.autoTable(columns, data, { startY: 30 });
    }

    doc.save("perfil_atleta.pdf");
  };

  return (
    <button onClick={exportarPDF} className="export-buttonAD">
      Exportar perfil PDF
    </button>
  );
}

export default ExportarPDFButton;
