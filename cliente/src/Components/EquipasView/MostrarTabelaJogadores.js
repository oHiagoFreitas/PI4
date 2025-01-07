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
            { pos: "pos6", title: "Meio Campista" },
            { pos: "pos7", title: "Meio Campista" },
            { pos: "pos8", title: "Meio Campista" },
            { pos: "pos9", title: "Atacante" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes (Reserva)" },
            { pos: "pos13", title: "Defesa Esquerda (Reserva)" },
            { pos: "pos14", title: "Defesa Central (Reserva)" },
            { pos: "pos15", title: "Defesa Direita (Reserva)" },
            { pos: "pos16", title: "Meio Campista (Reserva)" },
            { pos: "pos17", title: "Atacante (Reserva)" },
        ],
        "4-4-2": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Meio Campista" },
            { pos: "pos7", title: "Meio Campista" },
            { pos: "pos8", title: "Meio Campista" },
            { pos: "pos9", title: "Meio Campista" },
            { pos: "pos10", title: "Atacante" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes (Reserva)" },
            { pos: "pos13", title: "Defesa Esquerda (Reserva)" },
            { pos: "pos14", title: "Defesa Central (Reserva)" },
            { pos: "pos15", title: "Defesa Direita (Reserva)" },
            { pos: "pos16", title: "Meio Campista (Reserva)" },
            { pos: "pos17", title: "Atacante (Reserva)" },
        ],
        "4-2-3-1": [
            { pos: "pos1", title: "Guarda Redes" },
            { pos: "pos2", title: "Defesa Esquerda" },
            { pos: "pos3", title: "Defesa Central" },
            { pos: "pos4", title: "Defesa Central" },
            { pos: "pos5", title: "Defesa Direita" },
            { pos: "pos6", title: "Meio Campista" },
            { pos: "pos7", title: "Meio Campista" },
            { pos: "pos8", title: "Meio Campista" },
            { pos: "pos9", title: "Meio Campista" },
            { pos: "pos10", title: "Meio Campista" },
            { pos: "pos11", title: "Atacante" },
            { pos: "pos12", title: "Guarda Redes (Reserva)" },
            { pos: "pos13", title: "Defesa Esquerda (Reserva)" },
            { pos: "pos14", title: "Defesa Central (Reserva)" },
            { pos: "pos15", title: "Defesa Direita (Reserva)" },
            { pos: "pos16", title: "Meio Campista (Reserva)" },
            { pos: "pos17", title: "Atacante (Reserva)" },
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
