// EquipePrincipalForm.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EquipePrincipalForm({ setEquipePrincipalId }) {
    const { id } = useParams(); // Captura o ID da URL

    useEffect(() => {
        if (id) {
            setEquipePrincipalId(id); // Atualiza o ID da equipe sombra com o valor da URL
        }
    }, [id, setEquipePrincipalId]); // Só será atualizado se o ID mudar

    return null; // Este componente não precisa renderizar nada
}

export default EquipePrincipalForm;
