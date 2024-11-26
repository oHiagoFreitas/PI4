import React from "react";

function TabelaJogadores({ positions, ratings, onRemovePlayer }) {
    // Organiza as posições em uma tabela (titulares e reservas)
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
        // Adicionando as posições de reserva
        { id: "pos12", label: "Guarda Redes (Reserva)" },
        { id: "pos13", label: "Defesa Esquerda (Reserva)" },
        { id: "pos14", label: "Defesa Central (Reserva)" },
        { id: "pos15", label: "Defesa Direita (Reserva)" },
        { id: "pos16", label: "Meio Campista (Reserva)" },
        { id: "pos17", label: "Atacante (Reserva)" }
    ];

    return (
        <table className="tabela-jogadores">
            <thead>
                <tr>
                    <th colSpan="3">Titulares</th>
                </tr>
            </thead>
            <tbody>
                {positionList.slice(0, 11).map((position) => (
                    <tr key={position.id}>
                        <td>{position.label}</td>
                        <td>
                            {positions[position.id] ? (
                                <span>
                                    {positions[position.id].nome}{" "}
                                    {/* Exibe o rating do jogador */}
                                    {ratings[positions[position.id].id] ? (
                                        <span> - Rating: {ratings[positions[position.id].id]}</span>
                                    ) : (
                                        <span> - Rating: N/A</span>
                                    )}
                                    <button onClick={() => onRemovePlayer(position.id)}>Remover</button>
                                </span>
                            ) : (
                                "Vaga Livre"
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

            {/* Adicionando a divisão para reservas */}
            <thead>
                <tr>
                    <th colSpan="3" style={{ textAlign: 'center', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>
                        Reservas
                    </th>
                </tr>
            </thead>

            <tbody>
                {positionList.slice(11).map((position) => (
                    <tr key={position.id}>
                        <td>{position.label}</td>
                        <td>
                            {positions[position.id] ? (
                                <span>
                                    {positions[position.id].nome}{" "}
                                    {/* Exibe o rating do jogador */}
                                    {ratings[positions[position.id].id] ? (
                                        <span> - Rating: {ratings[positions[position.id].id]}</span>
                                    ) : (
                                        <span> - Rating: N/A</span>
                                    )}
                                    <button onClick={() => onRemovePlayer(position.id)}>Remover</button>
                                </span>
                            ) : (
                                "Vaga Livre"
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaJogadores;
