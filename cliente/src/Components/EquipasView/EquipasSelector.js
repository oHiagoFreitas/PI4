// src/Components/EquipasView/EquipasSelector.js

import React, { useState } from 'react';
import ShadowTeamsTable from './ShadowTeamsTable'; // Importando a tabela de equipas sombras
import '../../Style/Backoffice.css'; // Importando o arquivo CSS com as classes já existentes

function EquipasSelector() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showShadowTeams, setShowShadowTeams] = useState(false); // Estado para alternar entre a exibição da tabela

    const handleMainTeamClick = () => {
        setSelectedTeam('Equipa Principal');
        setShowShadowTeams(false); // Esconde a tabela de equipas sombras ao selecionar a equipa principal
        console.log('Equipa Principal selecionada');
    };

    const handleShadowTeamClick = () => {
        setSelectedTeam('Equipa Sombra');
        setShowShadowTeams(true); // Mostra a tabela de equipas sombras
        console.log('Equipa Sombra selecionada');
    };

    return (
        <div className="equipas-selector">
            <div className="actions-buttonsAT" style={{marginTop: '20px'}}>
                <button 
                    className={`button-createAT ${selectedTeam === 'Equipa Principal' ? 'active' : ''}`} 
                    onClick={handleMainTeamClick}>
                    Equipa Principal
                </button>
                
                <button 
                    className={`button-createAT ${selectedTeam === 'Equipa Sombra' ? 'active' : ''}`} 
                    onClick={handleShadowTeamClick}>
                    Equipa Sombra
                </button>
            </div>

            {/* Exibe a tabela de equipas sombras se 'Equipa Sombra' for selecionada */}
            {showShadowTeams && <ShadowTeamsTable />}
        </div>
    );
}

export default EquipasSelector;
