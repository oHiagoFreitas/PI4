import React from "react";

function Jogador({ nome, position, onClick }) {
    return (
        <div
            className="jogador"
            style={position.style}
            onClick={onClick}
        >
            {/* Exibe o nome do jogador, se houver */}
            {nome ? nome : position.title} 
        </div>
    );
}

export default Jogador;
