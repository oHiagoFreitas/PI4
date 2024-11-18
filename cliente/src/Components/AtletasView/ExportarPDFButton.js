import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ExportarPDFButton({ atleta, relatorios }) {
  const exportarPDF = () => {
    const doc = new jsPDF();

    // Estilo para o título (perfil do atleta)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // Cor branca para o título
    doc.setFillColor(222, 175, 94); // Cor de fundo do título
    doc.rect(0, 0, 210, 30, "F"); // Caixa de fundo (cor de fundo do cabeçalho)
    doc.text("Perfil do Atleta", 14, 22);

    // Estilo para as informações do atleta
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Cor preta para o texto
    doc.text(`Nome: ${atleta.nome}`, 14, 40);
    doc.text(`Data de Nascimento: ${new Date(atleta.dataNascimento).toLocaleDateString()}`, 14, 46);
    doc.text(`Nacionalidade: ${atleta.nacionalidade}`, 14, 52);
    doc.text(`Posição: ${atleta.posicao}`, 14, 58);
    doc.text(`Clube: ${atleta.clube}`, 14, 64);
    doc.text(`Plantel: ${atleta.plantel}`, 14, 70);
    doc.text(`Rating: ${atleta.rating}`, 14, 76);
    doc.text(`Agente: ${atleta.agente}`, 14, 82);
    doc.text(`Contato do Agente: ${atleta.contactoAgente}`, 14, 88);
    doc.text(`Link: ${atleta.link}`, 14, 94);

    // Linha de separação (similar à página)
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 96, 195, 96); // Linha de separação após informações do atleta

    // Adicionando os relatórios, se existirem
    if (relatorios.length > 0) {
      doc.addPage();
      doc.setTextColor(0, 0, 0);  // Cor do título dos relatórios
      doc.setFontSize(14);
      doc.text("Histórico de Relatórios", 14, 22);

      const columns = ["Data de Criação", "Utilizador", "Rating", "Comentários"];
      const data = relatorios.map((relatorio) => [
        new Date(relatorio.createdAt).toLocaleDateString(),
        relatorio.utilizador || "Não disponível",
        relatorio.ratingFinal,
        relatorio.comentario,
      ]);

      // Estilos personalizados para a tabela de relatórios (semelhante à tabela da página)
      doc.autoTable(columns, data, {
        startY: 30,
        theme: "grid",  // Usando grid para bordas
        headStyles: {
          fillColor: [245, 245, 245], // Cor de fundo do cabeçalho da tabela (cinza claro)
          textColor: 0, // Cor do texto (preto)
          fontSize: 12,
          halign: "center", // Alinhamento do texto no cabeçalho
        },
        bodyStyles: {
          fontSize: 10, // Tamanho da fonte do corpo da tabela
          halign: "center", // Alinhamento do texto nas células
        },
        columnStyles: {
          0: { cellWidth: 30 },  // Largura da primeira coluna (Data de Criação)
          1: { cellWidth: 50 },  // Largura da segunda coluna (Utilizador)
          2: { cellWidth: 30 },  // Largura da terceira coluna (Rating)
          3: { cellWidth: 80 },  // Largura da quarta coluna (Comentários)
        },
        margin: { top: 10 }, // Margem do topo
      });
    }

    // Salvar o PDF
    doc.save("perfil_atleta.pdf");
  };

  return (
    <button onClick={exportarPDF} className="export-buttonAD">
      Exportar perfil PDF
    </button>
  );
}

export default ExportarPDFButton;
