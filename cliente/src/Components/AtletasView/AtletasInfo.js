import React from "react";

function AtletasInfo({ atleta }) {
  return (
    <section className="sectionAD informacoes-basicasAD">
      <h2 style={{ color: '#DEAF5E' }}>Informações Básicas</h2>
      <p><strong>Data de Criação:</strong> {atleta.dataCriacao}</p>
      <p><strong>Nome completo:</strong> {atleta.nome}</p>
      <p><strong>Data de Nascimento:</strong> {new Date(atleta.dataNascimento).toLocaleDateString()}</p>
      <p><strong>Nacionalidade:</strong> {atleta.nacionalidade}</p>
      <p><strong>Posição:</strong> {atleta.posicao}</p>
      <p><strong>Link:</strong> <a href={atleta.link} target="_blank" rel="noopener noreferrer">{atleta.link}</a></p>
    </section>
  );
}

export default AtletasInfo;
