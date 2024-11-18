import React from "react";

function AtletasClube({ atleta }) {
  return (
    <section className="sectionAD clube-infoAD">
      <h2 style={{ color: '#DEAF5E' }}>Clube</h2>
      <p><strong>Clube:</strong> {atleta.clube}</p>
      <p><strong>Plantel:</strong> {atleta.plantel}</p>
    </section>
  );
}

export default AtletasClube;
