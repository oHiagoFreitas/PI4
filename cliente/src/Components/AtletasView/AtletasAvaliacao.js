import React from "react";

function AtletasAvaliacao() {
    const storedRating = localStorage.getItem('maxRating');
    const validRating = !isNaN(parseFloat(storedRating)) && isFinite(storedRating);

    return (
        <section className="sectionAD avaliacaoAD">
            <h2 style={{ color: '#DEAF5E' }}>Avaliação</h2>
            <p><strong>Rating:</strong> {validRating ? storedRating : "Não possui Avaliação"}</p>
        </section>
    );
}

export default AtletasAvaliacao;
