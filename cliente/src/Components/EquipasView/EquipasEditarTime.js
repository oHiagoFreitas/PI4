import React, { useState, useEffect } from 'react';
import '../../Style/AtletasTitle.css';

const EquipasEditarTime = () => {
    const [equipeNome, setEquipeNome] = useState("");  // Estado para armazenar o nome da equipe
    
    // Pega o ID da equipe sombra armazenado no localStorage
    const equipeSombraId = localStorage.getItem('equipeSombraId');
    
    useEffect(() => {
        if (equipeSombraId) {
            fetch(`https://localhost:3000/equipeSombra/${equipeSombraId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.nome) {
                        setEquipeNome(data.nome);  // Armazene o nome da equipe no estado
                    }
                })
                .catch(error => console.error("Erro ao carregar o nome da equipe:", error));
        }
    }, [equipeSombraId]);

    return (
        <div className="AtletasTitleMessage">
            <h1>Editando Equipe Sombra: {equipeNome || "Carregando..."}</h1>
        </div>
    );
};

export default EquipasEditarTime;
