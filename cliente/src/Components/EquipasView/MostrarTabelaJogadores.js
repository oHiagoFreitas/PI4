import React from "react";
import { X } from "react-bootstrap-icons"; // Importando o ícone 'x' do Bootstrap

function TabelaJogadores({ positions, ratings, onRemovePlayer, formacao }) {
    const formationData = {
        "4-3-3": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Atacante" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes " },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
        ],
        "4-4-2": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Médio" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
        ],
        "4-2-3-1": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Médio" },
            { pos: "pos10", title: "Médio" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
        ],
        "4-2-4": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Atacante" },
            { pos: "pos9", title: "Atacante" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
        ],
        "3-5-2": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Central" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Médio" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Médio" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
            
        ],
        "5-2-3": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Central" },
            { pos: "pos6", title: "Defesa Direita" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Atacante" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
            
        ],
        "5-3-2": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Central" },
            { pos: "pos6", title: "Defesa Direita" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Médio" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
            
        ],
        "5-4-1": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Central" },
            { pos: "pos6", title: "Defesa Direita" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Médio" },
            { pos: "pos10", title: "Médio" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
            
        ],
        "3-4-3": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Central" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Médio" },
            { pos: "pos6", title: "Médio" },
            { pos: "pos7", title: "Médio" },
            { pos: "pos8", title: "Médio" },
            { pos: "pos9", title: "Atacante" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes" },
            { pos: "pos13", title: "Defesa Esquerda" },
            { pos: "pos14", title: "Defesa Central" },
            { pos: "pos15", title: "Defesa Direita" },
            { pos: "pos16", title: "Médio" },
            { pos: "pos17", title: "Atacante" },
            
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
                        <th>Remover</th> {/* Coluna para o ícone de remover */}
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
