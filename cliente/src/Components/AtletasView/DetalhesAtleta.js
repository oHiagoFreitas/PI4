import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AtletasName from "../AtletasView/AtletasName"; // Componente para o nome do atleta
import AtletasInfo from "../AtletasView/AtletasInfo";
import AtletasClube from "../AtletasView/AtletasClube";
import AtletasAvaliacao from "../AtletasView/AtletasAvaliacao";
import AtletasAgente from "../AtletasView/AtletasAgente";
import ExportarPDFButton from "../AtletasView/ExportarPDFButton";
import HistoricoRelatorios from "../AtletasView/HistoricoRelatorios";
import "../../Style/AtletasView/DetalhesAtleta.css"; // Estilos


function DetalhesAtleta() {
  const { id } = useParams(); // Obtém o ID do atleta da URL
  const [atleta, setAtleta] = useState(null); // Estado para armazenar os dados do atleta
  const [relatorios, setRelatorios] = useState([]); // Estado para armazenar os relatórios
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const navigate = useNavigate(); // Inicializa o hook de navegação

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
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/relatorios/${id}`)
      .then((response) => {
        setRelatorios([response.data]);
      })
      .catch(() => {
        setError("Erro ao carregar os relatórios do atleta.");
      });
  }, [id]);

  return (
    <div className="backoffice-container">
      <Sidebar />
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

              <p>Última atualização: {atleta.ultimaAtualizacao}</p>

              <div className="informacoesAD">
                <AtletasInfo atleta={atleta} />
                <AtletasClube atleta={atleta} />
                <AtletasAvaliacao atleta={atleta} />
                <AtletasAgente atleta={atleta} />
              </div>

              <div className="button-containerAD">
                <ExportarPDFButton atleta={atleta} relatorios={relatorios} />
                <button onClick={() => navigate("/atletas")} className="back-buttonAD">
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
