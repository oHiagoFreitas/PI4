import React from "react";
import Jogador from './MostrarJogador';

function CampoFutebol({ positions }) {
    // Definindo todas as posições do campo de futebol
    const positionData = [
        { pos: "pos1", title: "Guarda Redes", style: { top: '60.5%', left: '19%' } },
        { pos: "pos2", title: "Defesa Esquerda", style: { top: '37%', left: '28%' } },
        { pos: "pos3", title: "Defesa Central", style: { top: '52%', left: '26%' } },
        { pos: "pos4", title: "Defesa Central", style: { top: '67%', left: '26%' } },
        { pos: "pos5", title: "Defesa Direita", style: { top: '82%', left: '28%' } },
        { pos: "pos6", title: "Meio Campista", style: { top: '60.5%', left: '45%' } },
        { pos: "pos7", title: "Meio Campista", style: { top: '73%', left: '37%' } },
        { pos: "pos8", title: "Meio Campista", style: { top: '47%', left: '37%' } },
        { pos: "pos9", title: "Atacante", style: { top: '37%', left: '52%' } },
        { pos: "pos10", title: "Atacante", style: { top: '82%', left: '52%' } },
        { pos: "pos11", title: "Atacante", style: { top: '60.5%', left: '56%' } },
        // Reservas
        { pos: "pos12", title: "Guarda Redes", style: { top: '28%', left: '80%' } },
        { pos: "pos13", title: "Defesa Esquerda", style: { top: '40%', left: '80%' } },
        { pos: "pos14", title: "Defesa Central", style: { top: '52%', left: '80%' } },
        { pos: "pos15", title: "Defesa Direita", style: { top: '64%', left: '80%' } },
        { pos: "pos16", title: "Meio Campista", style: { top: '76%', left: '80%' } },
        { pos: "pos17", title: "Atacante", style: { top: '88%', left: '80%' } },
    ];

    return (
        <div className="campo-futebol">
            {positionData.map(position => (
                <Jogador
                    key={position.pos}
                    position={position}
                    nome={positions[position.pos] ? positions[position.pos].nome : ""} // Exibe nome do jogador ou posição
                />
            ))}
        </div>
    );
}

export default CampoFutebol;
