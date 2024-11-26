// Jogador.js
import React from "react";

function Jogador({ position, nome, onClick }) {
    return (
        <div
            className="jogador"
            style={position.style}
            title={position.title}
            onClick={onClick}
        >
            {nome}
        </div>
    );
}

export default Jogador;
