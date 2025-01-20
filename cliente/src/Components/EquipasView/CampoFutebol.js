import React from "react";
import Jogador from "./Jogador";

function CampoFutebol({ positions, openModal, formacao }) {
    // Definindo todas as posições de titulares e reservas conforme a formação
    const formationData = {
        "4-3-3": [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Médio", style: { top: '53.5%', left: '45%' } },
            { pos: "pos7", title: "Médio", style: { top: '66%', left: '37%' } },
            { pos: "pos8", title: "Médio", style: { top: '40%', left: '37%' } },
            { pos: "pos9", title: "Atacante", style: { top: '35%', left: '52%' } },
            { pos: "pos10", title: "Atacante", style: { top: '75%', left: '52%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '56%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "4-4-2": [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Médio", style: { top: '62.5%', left: '37%' } },
            { pos: "pos7", title: "Médio", style: { top: '77%', left: '43%' } },
            { pos: "pos8", title: "Médio", style: { top: '45%', left: '37%' } },
            { pos: "pos9", title: "Médio", style: { top: '30%', left: '43%' } },
            { pos: "pos10", title: "Atacante", style: { top: '40%', left: '56%' } },
            { pos: "pos11", title: "Atacante", style: { top: '65%', left: '56%' } },
            // Reservas
            { pos: "pos17", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos12", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos13", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos14", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos15", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos16", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "4-2-4": [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Médio", style: { top: '64.5%', left: '43%' } },
            { pos: "pos7", title: "Médio", style: { top: '43%', left: '43%' } },
            { pos: "pos8", title: "Atacante", style: { top: '77%', left: '55%' } },
            { pos: "pos9", title: "Atacante", style: { top: '30%', left: '55%' } },
            { pos: "pos10", title: "Atacante", style: { top: '44%', left: '59%' } },
            { pos: "pos11", title: "Atacante", style: { top: '64%', left: '59%' } },
            // Reservas
            { pos: "pos17", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos12", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos13", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos14", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos15", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos16", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "4-2-3-1"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '45%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '60%', left: '26%' } },
            { pos: "pos5", title: "Defesa Direita", style: { top: '75%', left: '28%' } },
            { pos: "pos6", title: "Médio", style: { top: '53.5%', left: '48%' } },
            { pos: "pos7", title: "Médio", style: { top: '63%', left: '37%' } },
            { pos: "pos8", title: "Médio", style: { top: '43%', left: '37%' } },
            { pos: "pos9", title: "Médio",  style: { top: '35%', left: '48%' } },
            { pos: "pos10", title: "Médio", style: { top: '73%', left: '48%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '60%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "3-5-2"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Central", style: { top: '38%', left: '26%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '55%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '72%', left: '26%' } },
            { pos: "pos5", title: "Médio", style: { top: '75%', left: '48%' } },
            { pos: "pos6", title: "Médio", style: { top: '53.5%', left: '48%' } },
            { pos: "pos7", title: "Médio", style: { top: '63%', left: '37%' } },
            { pos: "pos8", title: "Médio", style: { top: '43%', left: '37%' } },
            { pos: "pos9", title: "Médio",  style: { top: '35%', left: '48%' } },
            { pos: "pos10", title: "Atacante", style: { top: '40%', left: '60%' } },
            { pos: "pos11", title: "Atacante", style: { top: '65%', left: '60%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "3-4-3"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Central", style: { top: '38%', left: '26%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '55%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '72%', left: '26%' } },
            { pos: "pos5", title: "Médio", style: { top: '62.5%', left: '37%' } },
            { pos: "pos6", title: "Médio", style: { top: '77%', left: '42%' } },
            { pos: "pos7", title: "Médio", style: { top: '45%', left: '37%' } },
            { pos: "pos8", title: "Médio", style: { top: '30%', left: '42%' } },
            { pos: "pos9", title: "Atacante", style: { top: '35%', left: '52%' } },
            { pos: "pos10", title: "Atacante", style: { top: '75%', left: '52%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '56%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "5-3-2"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '42%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '67%', left: '26%' } },
            { pos: "pos5", title: "Defesa Central", style: { top: '54.5%', left: '26%' } },
            { pos: "pos6", title: "Defesa Direita", style: { top: '80%', left: '28%' } }, 
            { pos: "pos7", title: "Médio", style: { top: '53%', left: '42%' } },
            { pos: "pos8", title: "Médio",  style: { top: '35%', left: '42%' } },
            { pos: "pos9", title: "Médio", style: { top: '73%', left: '42%' } },
            { pos: "pos10", title: "Atacante", style: { top: '63%', left: '58%' } },
            { pos: "pos11", title: "Atacante", style: { top: '43.5%', left: '58%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
        "5-4-1"
        : [
            { pos: "pos1", title: "Guarda redes", style: { top: '53.5%', left: '19%' } },
            { pos: "pos2", title: "Defesa Esquerda", style: { top: '30%', left: '28%' } },
            { pos: "pos3", title: "Defesa Central", style: { top: '42%', left: '26%' } },
            { pos: "pos4", title: "Defesa Central", style: { top: '67%', left: '26%' } },
            { pos: "pos5", title: "Defesa Central", style: { top: '54.5%', left: '26%' } },
            { pos: "pos6", title: "Defesa Direita", style: { top: '80%', left: '28%' } }, 
            { pos: "pos7", title: "Médio", style: { top: '62.5%', left: '42%' } },
            { pos: "pos8", title: "Médio", style: { top: '77%', left: '49%' } },
            { pos: "pos9", title: "Médio", style: { top: '45%', left: '42%' } },
            { pos: "pos10", title: "Médio", style: { top: '30%', left: '49%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '57%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
            
    };

    const currentFormationPositions = formationData[formacao] || [];

    return (
        <div className="campo-futebol">
            {currentFormationPositions.map(position => (
                <Jogador
                    key={position.pos}
                    position={position}
                    nome={positions[position.pos] ? positions[position.pos].nome : ""} // Nome do jogador
                    onClick={() => openModal(position.title, position.pos)} // Chama a modal com título e posição
                />
            ))}
        </div>
    );
}

export default CampoFutebol;
