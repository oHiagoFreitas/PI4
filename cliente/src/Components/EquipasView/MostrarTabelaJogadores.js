function MostrarTabelaJogadores({ positions, ratings }) {
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
                        <th>Avaliação</th>
                    </tr>
                </thead>
                <tbody>
                    {positionList.map((position) => (
                        <tr key={position.id}>
                            <td>{position.label}</td>
                            <td>
                                {positions[position.id] ? (
                                    <>
                                        <span>{positions[position.id].nome}</span>
                                    </>
                                ) : (
                                    "Vaga Livre"
                                )}
                            </td>
                            <td>
                                {positions[position.id] ? (
                                    ratings[positions[position.id].id] || "N/A"
                                ) : (
                                    "N/A"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MostrarTabelaJogadores;
