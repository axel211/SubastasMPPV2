import React from 'react';
import styled from 'styled-components';
import LoteCard from 'components/LoteCard';

// Estilos para el contenedor de la lista de lotes
const LotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Ajusta el espacio entre las cards */
`;

function LotesCatalog() {
  // Datos ficticios para simular la lista de lotes
  const lotesData = [
    { id: 1, nombre: 'Lote 1', descripcion: 'Descripción del lote 1' },
    { id: 2, nombre: 'Lote 2', descripcion: 'Descripción del lote 2' },
    { id: 3, nombre: 'Lote 3', descripcion: 'Descripción del lote 3' },
    // Agrega más objetos de lote según sea necesario
  ];

  return (
    <LotesContainer>
      {lotesData.map((lote) => (
        <LoteCard key={lote.id} lote={lote} />
      ))}
    </LotesContainer>
  );
}

export default LotesCatalog;
