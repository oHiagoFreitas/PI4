import React from "react";

function EditarJogador({ nome, position, onClick }) {
    return (
        <div
            className="jogador"
            style={position.style}
            onClick={onClick}
        >
            {/* Exibe o nome do jogador, se houver */}
            {nome ? nome : position.title} {/* Se houver um nome, exibe o nome do jogador, senão exibe o nome da posição */}
        </div>
    );
}

export default EditarJogador;
