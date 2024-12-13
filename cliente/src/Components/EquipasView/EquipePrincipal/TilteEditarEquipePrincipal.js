// src/Components/EquipasView/EquipasEditarTime.js

import React, { useState, useEffect } from 'react';
import '../../../Style/AtletasTitle.css';

const TilteEditarEquipePrincipal = () => {
    const [equipeNome, setEquipeNome] = useState("");  // Estado para armazenar o nome da equipe
    
    // Pega o ID da equipe principal armazenado no localStorage
    const equipePrincipalId = localStorage.getItem('equipePrincipalId');
    
    useEffect(() => {
        if (equipePrincipalId) {
            fetch(`http://localhost:3000/equipePrincipal/${equipePrincipalId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.nome) {
                        setEquipeNome(data.nome);  // Armazene o nome da equipe no estado
                    }
                })
                .catch(error => console.error("Erro ao carregar o nome da equipe:", error));
        }
    }, [equipePrincipalId]);

    return (
        <div className="AtletasTitleMessage">
            <h1>Editando Equipe Principal: {equipeNome || "Carregando..."}</h1>
        </div>
    );
};

export default TilteEditarEquipePrincipal;
