import React from "react";

function AtletasAgente({ atleta }) {
  return (
    <section className="sectionAD encargosAD">
      <h2 style={{ color: '#DEAF5E' }}>Encargo de Educação/Agente</h2>
      <p><strong>Nome:</strong> {atleta.agente}</p>
      <p><strong>Contato:</strong> {atleta.contactoAgente}</p>
    </section>
  );
}

export default AtletasAgente;
