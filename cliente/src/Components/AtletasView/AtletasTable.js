import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import '../../Style/AtletasView/AtletasTable.css';
import CreateAthleteModal from '../CreateAthleteModal';  // Importando o modal de criação de atleta

// Função para a tabela de atletas
function AtletasTable() {
  const [atletas, setAtletas] = useState([]); // Estado para armazenar atletas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle da modal
  const [selectedAtleta, setSelectedAtleta] = useState(null); // Estado para o atleta selecionado

  useEffect(() => {
    // Chama a API para obter os dados de atletas
    axios
      .get('http://localhost:3000/atletas')
      .then((response) => {
        setAtletas(response.data); // Armazena os dados no estado
      })
      .catch((error) => {
        console.error('Erro ao carregar atletas:', error);
      });
  }, []);

  // Função para abrir a modal
  const openCreateAtletaModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar a modal
  const closeCreateAtletaModal = () => {
    setIsModalOpen(false);
  };

  // Função para lidar com a ação de "Ver"
  const handleView = (atletaId) => {
    // Aqui você pode adicionar a lógica para visualizar detalhes do atleta
    Swal.fire({
      title: 'Detalhes do Atleta',
      text: `Mostrando detalhes do atleta ${atletaId}`,
      icon: 'info',
      confirmButtonText: 'Fechar'
    });
  };

  // Função para lidar com a ação de "Editar"
  const handleEdit = (atletaId) => {
    // Aqui você pode adicionar a lógica para editar o atleta
    Swal.fire({
      title: 'Editar Atleta',
      text: `Editando atleta ${atletaId}`,
      icon: 'warning',
      confirmButtonText: 'Fechar'
    });
  };

  // Função para lidar com a ação de "Apagar"
  const handleDelete = (atletaId) => {
    // Aqui você pode adicionar a lógica para excluir o atleta
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Você tem certeza que deseja excluir o atleta ${atletaId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Exemplo de chamada de API para excluir o atleta
        axios
          .delete(`http://localhost:3000/atletas/${atletaId}`)
          .then(() => {
            Swal.fire('Deletado!', 'O atleta foi excluído.', 'success');
            setAtletas(atletas.filter((atleta) => atleta.id !== atletaId)); // Remove o atleta da lista
          })
          .catch((error) => {
            console.error('Erro ao excluir atleta:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o atleta.', 'error');
          });
      }
    });
  };

  return (
    <div className="atletas-table-containerAT">
      {/* Botões para Criar e Exportar */}
      <div className="actions-buttonsAT">
        <button className="button-createAT" onClick={openCreateAtletaModal}>Criar Atleta</button>
        <button className="button-exportAT">Exportar Atletas</button>
      </div>

      {/* Tabela com dados dos atletas */}
      <table className="atletas-tableAT">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>País</th>
            <th>Posição</th>
            <th>Time</th>
            <th>Status</th>
            <th>Ações</th> {/* Coluna de Ações */}
          </tr>
        </thead>
        <tbody>
          {atletas.map((atleta) => (
            <tr key={atleta.id}>
              <td>{atleta.id}</td>
              <td>{atleta.nome}</td>
              <td>{atleta.nacionalidade}</td>
              <td>{atleta.posicao}</td>
              <td>{atleta.clube}</td>
              <td>{atleta.status}</td>
              <td>
                {/* Ícones de Ações com Bootstrap Icons */}
                <button className="action-buttonAT" onClick={() => handleView(atleta.id)}>
                  <i className="bi bi-eye" title="Ver"></i> {/* Ícone de Ver */}
                </button>
                <button className="action-buttonAT" onClick={() => handleEdit(atleta.id)}>
                  <i className="bi bi-pencil" title="Editar"></i> {/* Ícone de Editar */}
                </button>
                <button className="action-buttonAT" onClick={() => handleDelete(atleta.id)}>
                  <i className="bi bi-trash" title="Apagar"></i> {/* Ícone de Apagar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Criação de Atleta */}
      <CreateAthleteModal
        isOpen={isModalOpen}
        onRequestClose={closeCreateAtletaModal}
      />
    </div>
  );
}

export default AtletasTable;
