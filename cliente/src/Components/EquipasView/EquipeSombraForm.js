// EquipeSombraForm.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EquipeSombraForm({ setEquipeSombraId }) {
    const { id } = useParams(); // Captura o ID da URL

    useEffect(() => {
        if (id) {
            setEquipeSombraId(id); // Atualiza o ID da equipe sombra com o valor da URL
        }
    }, [id, setEquipeSombraId]); // Só será atualizado se o ID mudar

    return null; // Este componente não precisa renderizar nada
}

export default EquipeSombraForm;
