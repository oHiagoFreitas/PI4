// src/hooks/usePlayers.js

import { useState, useEffect } from "react";

const usePlayers = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/atletas")
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Erro ao carregar jogadores:", error));
    }, []);

    return players;
};

export default usePlayers;
