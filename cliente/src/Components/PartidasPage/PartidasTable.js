import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css'; // Importando o CSS da tabela
import TabelaPartidas from './TabelaPartidas'; // Componente da Tabela de Partidas
import TabelaJogosAtribuidos from './TabelaJogosAtribuidos'; // Componente da Tabela de Jogos Atribuídos
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Importando o jsPDF

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
      .get(`http://localhost:3000/partidas/atribuidas/${userId}`) // Rota de partidas atribuídas
      .then((response) => setJogosAtribuidos(response.data))
      .catch((error) => console.error('Erro ao carregar jogos atribuídos:', error));
  }, [navigate]);

  const handleDelete = (partidaId) => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir a partida ${partidaId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/partidas/${partidaId}`) // Rota de delete de partidas
          .then(() => {
            Swal.fire('Deletado!', 'A partida foi excluída.', 'success');
            setPartidas(partidas.filter((partida) => partida.id !== partidaId));
          })
          .catch((error) => {
            console.error('Erro ao excluir partida:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir a partida.', 'error');
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
    doc.text('Meus Jogos Atribuídos', 14, 16);

    // Define a posição inicial para a tabela
    let yPosition = 30;

    // Adiciona as colunas da tabela
    doc.setFontSize(12);
    doc.text('Data', 14, yPosition);
    doc.text('Hora', 40, yPosition);
    doc.text('Local', 70, yPosition);
    doc.text('Time Mandante', 100, yPosition);
    doc.text('Time Visitante', 140, yPosition);
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

  return (
    <div className="atletas-table-containerAT">
      {/* Botões de Ação */}
      <div className="actions-buttonsAT" style={{ justifyContent: 'flex-end' }}>
      <h2 >Meus jogos Atribuidos</h2>
        <button
          className="button-createAT"
          onClick={handleCreatePartida} // Lógica de navegação para criação de partida
        >
          Criar Partida
        </button>
        <button className="button-exportAT" onClick={exportarMeusJogosParaPDF}>
          Exportar Meus Jogos
        </button>
      </div>

      {/* Tabela com dados das partidas */}
      <TabelaJogosAtribuidos jogosAtribuidos={jogosAtribuidos} />
      

      {/* Tabela com jogos atribuídos ao usuário */}
      <div className="tabela-jogos-atribuídos">
        <h2>Todos os Jogos</h2>
        <TabelaPartidas 
        partidas={partidas}
        handleEdit={() => {/* Lógica de edição sem modal */}}
        handleDelete={handleDelete}
      />
      </div>
    </div>
  );
}

export default PartidasTable;
