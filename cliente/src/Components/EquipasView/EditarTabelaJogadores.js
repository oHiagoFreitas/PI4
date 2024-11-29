import React from "react";
import { X } from 'react-bootstrap-icons';

function EditarTabelaJogadores({ positions, ratings, onRemovePlayer }) {
    const positionList = [
        { id: "pos1", label: "Guarda Redes" },
        { id: "pos2", label: "Defesa Esquerda" },
        { id: "pos3", label: "Defesa Central" },
        { id: "pos4", label: "Defesa Central" },
        { id: "pos5", label: "Defesa Direita" },
        { id: "pos6", label: "Meio Campista" },
        { id: "pos7", label: "Meio Campista" },
        { id: "pos8", label: "Meio Campista" },
        { id: "pos9", label: "Atacante" },
        { id: "pos10", label: "Atacante" },
        { id: "pos11", label: "Atacante" },
        { id: "pos12", label: "Guarda Redes (Reserva)" },
        { id: "pos13", label: "Defesa Esquerda (Reserva)" },
        { id: "pos14", label: "Defesa Central (Reserva)" },
        { id: "pos15", label: "Defesa Direita (Reserva)" },
        { id: "pos16", label: "Meio Campista (Reserva)" },
        { id: "pos17", label: "Atacante (Reserva)" }
    ];

    return (
        <div className="table-container">
            <table className="tabela-jogadores">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Jogador</th>
                        <th>Rating</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {positionList.slice(0, 11).map((position) => (
                        <tr key={position.id}>
                            <td>{position.label}</td>
                            <td>
                                {positions[position.id] ? (
                                    <span>{positions[position.id].nome}</span>
                                ) : (
                                    "Vaga Livre"
                                )}
                            </td>
                            <td>
                                {positions[position.id] && ratings[positions[position.id].id] ? (
                                    <span className="rating">{ratings[positions[position.id].id]}</span>
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>
                                {positions[position.id] && (
                                    <X
                                        onClick={() => onRemovePlayer(position.id)} // Chama a função de remoção
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

export default EditarTabelaJogadores;
