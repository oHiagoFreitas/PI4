import React from "react";

function AtletasClube({ atleta }) {
  return (
    <section className="sectionAD clube-infoAD">
      <h2 style={{ color: '#DEAF5E' }}>Clube</h2>
      <p><strong>Clube:</strong> {atleta.time ? atleta.time.nome : "Não disponível"}</p>
      <p><strong>País:</strong> {atleta.time ? atleta.time.pais : "Não disponível"}</p>
      <p><strong>Categoria:</strong> {atleta.time ? atleta.time.categoria : "Não disponível"}</p>
      <p><strong>Descrição:</strong> {atleta.time ? atleta.time.descricao : "Não disponível"}</p>
    </section>
  );
}

export default AtletasClube;
