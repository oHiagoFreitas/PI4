import React from "react";

function AtletasAvaliacao({ atleta }) {
  return (
    <section className="sectionAD avaliacaoAD">
      <h2>Avaliação</h2>
      <p><strong>Rating:</strong> {atleta.rating}</p>
    </section>
  );
}

export default AtletasAvaliacao;
