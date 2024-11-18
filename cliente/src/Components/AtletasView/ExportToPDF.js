import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function ExportToPDF({ atletas }) {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Adiciona o título
    doc.text('Tabela de Atletas', 14, 16);

    // Captura os dados da tabela e cria o conteúdo para o PDF
    let yPosition = 30;
    doc.autoTable({
      startY: yPosition,
      head: [['ID', 'Nome', 'País', 'Posição', 'Time', 'Status']],
      body: atletas.map(atleta => [
        atleta.id,
        atleta.nome,
        atleta.nacionalidade,
        atleta.posicao,
        atleta.clube,
        atleta.status
      ]),
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    // Salva o PDF com o nome desejado
    doc.save('tabela_atletas.pdf');
  };

  return (
    <button className="button-exportAT" onClick={exportToPDF}>
      Exportar Atletas
    </button>
  );
}

export default ExportToPDF;
