import React from 'react';
import styled from 'styled-components';

// Estilos para la card de lote
const Card = styled.div`
  width: calc(33% - 20px); /* Ancho ajustado para mostrar 3 cards por fila */
  margin: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 15px;
`;

function LoteCard({ lote }) {
  return (
    <Card>
      <Title>{lote.title}</Title>
      <Image src={lote.imageUrl} alt={lote.title} />
      <Description>{lote.description}</Description>
      {/* Otros detalles del lote, como precio, fecha, etc. */}
    </Card>
  );
}

export default LoteCard;
