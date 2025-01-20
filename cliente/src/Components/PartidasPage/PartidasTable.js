import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import TabelaPartidas from './TabelaPartidas'; // Componente da Tabela de Partidas
import TabelaJogosAtribuidos from './TabelaJogosAtribuidos'; // Componente da Tabela de Jogos Atribuídos
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Importando o jsPDF
import * as XLSX from 'xlsx'; // Importando a biblioteca para exportar para Excel

function PartidasTable() {
  const [partidas, setPartidas] = useState([]); // Estado para todas as partidas
  const [jogosAtribuidos, setJogosAtribuidos] = useState([]); // Estado para jogos atribuídos ao usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage

    if (!userId) {
      Swal.fire('Erro', 'Usuário não está logado.', 'error');
      navigate('/login'); // Redireciona para login se o ID não for encontrado
      return;
    }

    // Carrega todas as partidas
    axios
      .get('http://localhost:3000/partidas') // Rota para buscar todas as partidas
      .then((response) => setPartidas(response.data))
      .catch((error) => console.error('Erro ao carregar partidas:', error));

    // Carrega as partidas atribuídas ao usuário logado
    axios
      .get(`http://localhost:3000/partidas/atribuidas/${userId}`) // Corrigido a interpolação da URL
      .then((response) => setJogosAtribuidos(response.data))
      .catch((error) => console.error('Erro ao carregar jogos atribuídos:', error));
  }, [navigate]);

  const handleDelete = (partidaId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Tem certeza que deseja apagar o jogo? ${partidaId}?`, // Corrigida a interpolação
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/partidas/${partidaId}`) // Corrigido a interpolação da URL
          .then(() => {
            Swal.fire('Deletado!', 'O jogo foi apagado.', 'success');
            setPartidas(partidas.filter((partida) => partida.id !== partidaId));
          })
          .catch((error) => {
            console.error('Erro ao apagar jogo:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao apagar jogo.', 'error');
          });
      }
    });
  };

  const handleCreatePartida = () => {
    navigate('/criar-partida'); // Redireciona para a página de criação de partida
  };

  // Função para exportar os "Meus Jogos" para PDF
  const exportarMeusJogosParaPDF = () => {
    const doc = new jsPDF(); // Cria um novo documento PDF

    // Adiciona um título
    doc.setFontSize(16);
    doc.text('Os meus Jogos', 14, 16);

    // Define a posição inicial para a tabela
    let yPosition = 30;

    // Adiciona as colunas da tabela
    doc.setFontSize(12);
    doc.text('Data', 14, yPosition);
    doc.text('Hora', 40, yPosition);
    doc.text('Local', 70, yPosition);
    doc.text('Equipa da Casa', 100, yPosition);
    doc.text('Equipa Visitante', 140, yPosition);
    doc.text('Jogadores', 180, yPosition); // Coluna dos jogadores
    yPosition += 10;

    // Preenche as linhas da tabela com os dados dos jogos atribuídos
    jogosAtribuidos.forEach((jogo) => {
      doc.text(jogo.data, 14, yPosition);
      doc.text(jogo.hora, 40, yPosition);
      doc.text(jogo.local, 70, yPosition);
      doc.text(jogo.timeMandante?.nome || 'N/A', 100, yPosition);
      doc.text(jogo.timeVisitante?.nome || 'N/A', 140, yPosition);

      // Adiciona os jogadores
      const jogadores = jogo.jogadores?.map((jogador) => jogador.nome).join(', ') || 'N/A';
      doc.text(jogadores, 180, yPosition);

      yPosition += 10;
    });

    // Salva o documento PDF
    doc.save('meus_jogos_atribuidos.pdf');
  };

  // Função para exportar os "Meus Jogos" para Excel
  const exportarMeusJogosParaExcel = () => {
    const data = [
      ["Data", "Hora", "Local", "Equipa da Casa", "Equipa Visitante", "Jogadores"],
      ...jogosAtribuidos.map((jogo) => [
        jogo.data,
        jogo.hora,
        jogo.local,
        jogo.timeMandante?.nome || 'N/A',
        jogo.timeVisitante?.nome || 'N/A',
        jogo.jogadores?.map((jogador) => jogador.nome).join(', ') || 'N/A',
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data); // Convertendo a array para uma planilha
    const workbook = XLSX.utils.book_new(); // Criando um novo livro de trabalho
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meus Jogos"); // Adicionando a planilha ao livro
    XLSX.writeFile(workbook, 'meus_jogos_atribuidos.xlsx'); // Gerando o arquivo Excel
  };

  return (
    <div className="atletas-table-containerAT" style={{ display: "flex" }}>
      {/* Botões de Ação */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <div > <h2 style={{ color: "#DEAF5E" }}>Os meus jogos</h2> </div>
        <div className="actions-buttonsAT">


          {/* Exibe o botão de "Criar Partida" apenas para Admins */}
          {localStorage.getItem('userRole') === 'Admin' && (
            <button
              className="button-createAT"
              onClick={handleCreatePartida} // Lógica de navegação para criação de partida
            >
              Criar Jogo
            </button>
          )}

          <button className="button-exportAT" onClick={exportarMeusJogosParaPDF}>
            Exportar Meus Jogos em PDF
          </button>
          <button className="button-exportAT" onClick={exportarMeusJogosParaExcel}>
            Exportar Meus Jogos em Excel
          </button>
        </div>
      </div>

      {/* Tabela com dados dos jogos atribuídos */}
      <TabelaJogosAtribuidos jogosAtribuidos={jogosAtribuidos} />

      {/* Tabela com jogos atribuídos ao usuário */}
      <div className="tabela-jogos-atribuídos">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ color: '#DEAF5E', margin: 0 }}>Todos os Jogos</h2>
          <hr style={{ flex: 1, border: '0.5px dashed #DEAF5E', margin: 0, borderWidth: '1px', borderStyle: 'dashed', borderSpacing: '10px' }} />

        </div>
        <TabelaPartidas
          partidas={partidas}
          handleEdit={() => { /* Lógica de edição sem modal */ }}
          handleDelete={handleDelete}
        />
      </div>

    </div>
  );
}

export default PartidasTable;
