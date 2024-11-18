import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import AtletasName from "../AtletasView/AtletasName"; // Importando o componente filho
import "../../Style/AtletasView/DetalhesAtleta.css"; // Estilos personalizados

function DetalhesAtleta() {
  const { id } = useParams(); // Obtém o ID do atleta da URL
  const [atleta, setAtleta] = useState(null); // Estado para armazenar os dados do atleta
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    // Faz a requisição à API para buscar os detalhes do atleta
    axios
      .get(`http://localhost:3000/atletas/${id}`)
      .then((response) => {
        setAtleta(response.data); // Atualiza o estado com os dados do atleta
        setLoading(false); // Define o carregamento como falso após a resposta
      })
      .catch(() => {
        setError("Erro ao carregar os detalhes do atleta."); // Em caso de erro, atualiza o estado de erro
        setLoading(false); // Define o carregamento como falso
      });
  }, [id]); // O efeito é executado quando o ID mudar (provavelmente com a navegação entre atletas)

  return (
    <div className="backoffice-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="sub-main-content">
          {loading && <p>Carregando...</p>} {/* Exibe "Carregando..." enquanto os dados estão sendo carregados */}
          {error && <p>{error}</p>} {/* Exibe uma mensagem de erro caso aconteça algum problema */}
          {atleta && (  // Se os dados do atleta estiverem carregados, renderiza o conteúdo
            <div className="detalhes-atleta">
              <div className="header">
                {/* Passa os dados de 'atleta' para o componente filho AtletasName */}
                <AtletasName atleta={atleta} /> 
                
              </div>

              <p>Última atualização: {atleta.ultimaAtualizacao}</p>

              <button className="export-button">Exportar perfil PDF</button>

              <div className="informacoes">
                <section className="informacoes-basicas">
                  <h2>Informações Básicas</h2>
                  <p><strong>Data de Criação:</strong> {atleta.dataCriacao}</p>
                  <p><strong>Nome completo:</strong> {atleta.nome}</p>
                  <p><strong>Data de Nascimento:</strong> {atleta.dataNascimento}</p>
                  <p><strong>Nacionalidade:</strong> {atleta.nacionalidade}</p>
                  <p><strong>Posição:</strong> {atleta.posicao}</p>
                  <p><strong>Link:</strong> <a href={atleta.link} target="_blank" rel="noopener noreferrer">Perfil</a></p>
                </section>

                <section className="clube-info">
                  <h2>Clube</h2>
                  <p><strong>Clube:</strong> {atleta.clube}</p>
                  <p><strong>Plantel:</strong> {atleta.plantel}</p>
                </section>

                <section className="avaliacao">
                  <h2>Avaliação</h2>
                  <p><strong>Rating:</strong> {atleta.rating}</p>
                </section>

                <section className="encargos">
                  <h2>Encargo de Educação/Agente</h2>
                  <p><strong>Nome:</strong> {atleta.agenteNome}</p>
                  <p><strong>Contato:</strong> {atleta.agenteContato}</p>
                </section>
              </div>

              <div className="historico-relatorios">
                <h2 >Histórico de Relatórios</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Data de criação</th>
                      <th>Utilizador</th>
                      <th>Rating</th>
                      <th>Comentários adicionais</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atleta.relatorios && atleta.relatorios.map((relatorio, index) => (
                      <tr key={index}>
                        <td>{relatorio.dataCriacao}</td>
                        <td>{relatorio.utilizador}</td>
                        <td>{relatorio.rating}</td>
                        <td>{relatorio.comentarios}</td>
                        <td><button>Ver</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesAtleta;
