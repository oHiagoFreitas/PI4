import React from "react";
import { X } from "react-bootstrap-icons"; // Importando o ícone 'x' do Bootstrap

function TabelaJogadores({ positions, ratings, onRemovePlayer, formacao }) {
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
            { pos: "pos10", title: "Médio", style: { top: '75%', left: '48%' } },
            { pos: "pos11", title: "Atacante", style: { top: '53.5%', left: '59%' } },
            // Reservas
            { pos: "pos12", title: "Guarda redes", style: { top: '21%', left: '80%' } },
            { pos: "pos13", title: "Defesa Esquerda", style: { top: '33%', left: '80%' } },
            { pos: "pos14", title: "Defesa Central", style: { top: '45%', left: '80%' } },
            { pos: "pos15", title: "Defesa Direita", style: { top: '57%', left: '80%' } },
            { pos: "pos16", title: "Médio", style: { top: '69%', left: '80%' } },
            { pos: "pos17", title: "Atacante", style: { top: '81%', left: '80%' } },
        ],
    };

    const currentFormation = formationData[formacao] || [];

    return (
        <div className="table-container">
            <table className="tabela-jogadores">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Jogador</th>
                        <th>Rating</th> {/* Coluna para rating */}
                    </tr>
                </thead>
                <tbody>
                    {currentFormation.slice(0, 11).map((position) => (
                        <tr key={position.pos}>
                            <td>{position.title}</td>
                            <td>
                                {positions[position.pos] ? (
                                    <span>{positions[position.pos].nome}</span>
                                ) : (
                                    "Vaga Livre"
                                )}
                            </td>
                            <td>
                                {positions[position.pos] && ratings[positions[position.pos].id] ? (
                                    <span className="rating">{ratings[positions[position.pos].id]}</span>
                                ) : (
                                    "N/A"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

                {/* Adicionando a divisão para reservas */}
                <thead>
                    <tr>
                        <th colSpan="4" className="reservas-header">
                            Reservas
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentFormation.slice(11).map((position) => (
                        <tr key={position.pos}>
                            <td>{position.title}</td>
                            <td>
                                {positions[position.pos] ? (
                                    <span>{positions[position.pos].nome}</span>
                                ) : (
                                    "Vaga Livre"
                                )}
                            </td>
                            <td>
                                {positions[position.pos] && ratings[positions[position.pos].id] ? (
                                    <span className="rating">{ratings[positions[position.pos].id]}</span>
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>
                                {positions[position.pos] && (
                                    <X
                                        onClick={() => onRemovePlayer(position.pos)}
                                        className="remove-icon"
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaJogadores;
