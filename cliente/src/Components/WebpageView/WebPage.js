import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../Style/AtletasView/DetalhesAtleta.css";
import Swal from 'sweetalert2';
import EditModal from './TextEditModal'; // Corrigido para TextEditModal

function WebPageView() {
  const { id } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pi4-hdnd.onrender.com/MicroSite/1`)
      .then((response) => {
        setPageData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erro ao carregar os detalhes da página.");
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível carregar os detalhes da página.',
        });
      });
  }, [id]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleEditClick = () => {
    setEditData({
      titulo: pageData.titulo,
      mensagem: pageData.mensagem,
    });
    setIsEditing(true);
  };

  const handleSaveChanges = (updatedData) => {
    setPageData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="backoffice-containerAD">
      <div>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {pageData && (
          <div className="detalhes-paginaAD">
            <div className="headerAD">
              <h1>Web Page: {pageData.titulo || "Título não disponível"}</h1>
            </div>

            <div style={{ display: 'flex', marginBottom: '0px' }}>
              <p style={{ color: 'Black', marginRight: '4px', marginBottom: '0px' }}>
                Criado em: {new Date(pageData.createdAt).toLocaleDateString()}
              </p>
              <p style={{ color: 'Black', marginBottom: '0px' }}>
                Última atualização: {new Date(pageData.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="sectionAD informacoesAD">
              <div>
                <strong>Título da Página:</strong> 
                {isEditing ? (
                  <input
                    type="text"
                    value={ editData.titulo || " "}
                    onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                  />
                ) : (
                  pageData.titulo || "Título não disponível"
                )}
              </div>
              <div>
                <strong>Conteúdo:</strong> 
                {isEditing ? (
                  <textarea
                    value={ editData.mensagem || " "}
                    onChange={(e) => setEditData({ ...editData, mensagem: e.target.value })}
                  />
                ) : (
                  pageData.mensagem || "Conteúdo não disponível"
                )}
              </div>
            </div>

            <div className="button-containerAD">
              <button onClick={() => navigate(-1)} className="back-buttonAD">
                Voltar
              </button>
              <button onClick={handleEditClick} className="back-buttonAD">
                Editar
              </button>
              <Link to="/MicroSite">Ir para Web Page</Link>
            </div>
          </div>
        )}
      </div>

      {/* Componente da Modal */}
      <EditModal
        isVisible={isEditing}
        editData={editData}
        setEditData={setEditData}
        onSave={handleSaveChanges}
        onCancel={() => setIsEditing(false)}
      />
    </div>
  );
}

export default WebPageView;
