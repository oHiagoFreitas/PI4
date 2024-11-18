import React from 'react';


const AtletasName = ({ atleta }) => {  // Desestruturando 'atleta' de props
  return (
    <div>
      <h1>{atleta.nome}</h1> {/* Acessando o nome do atleta */}
      {/* Você pode acessar outros dados de 'atleta' aqui */}
    </div>
  );
};

export default AtletasName;
