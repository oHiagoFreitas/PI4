import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela
import TabelaPendentes from './TabelaPendentes'; // Componente da Tabela de Usuários

function UsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);

  // Carregar os dados dos usuários na inicialização
  useEffect(() => {
    axios
      .get('http://localhost:3000/utilizadores') // Rota de usuários
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error('Erro ao carregar usuários:', error));
  }, []);

  return (
    <div className="usuarios-table-containerAAT">
      {/* Tabela com dados dos usuários */}
      <TabelaPendentes usuarios={usuarios} />
    </div>
  );
}

export default UsuariosTable;
