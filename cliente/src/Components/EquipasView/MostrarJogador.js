import React from "react";

function MostrarJogador({ nome, position }) {
    return (
        <div
            className="jogador"
            style={position.style}
        >
            {/* Exibe o nome do jogador, se houver, caso contrário mostra a posição */}
            {nome ? nome : position.title}
        </div>
    );
}

export default MostrarJogador;
