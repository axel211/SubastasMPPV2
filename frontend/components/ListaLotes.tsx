import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';
// Definir estilos para la tarjeta del lote
const Card = styled.div`
  width: calc(25% - 20px); /* 25% del ancho de la fila menos el espacio entre tarjetas */
  margin: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

// Definir estilos para el número de lote
const LoteNumber = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

// Definir estilos para el valor actual y el monto
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// Definir estilos para el tiempo de cierre de la subasta
const TimeLeft = styled.div`
  font-style: italic;
  margin-top: 10px;
`;

// Definir estilos para el botón de más información
const MoreInfoButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const ListaLotes = () => {
  // Ejemplo de datos de lotes
  const lotes = [
    {
      numero: 'Lote 1',
      fotos: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'],
      valorActual: '$1000',
      monto: '$2000',
      tiempoCierre: '3 horas restantes',
    },
    {
      numero: 'Lote 2',
      fotos: ['foto4.jpg', 'foto5.jpg', 'foto6.jpg'],
      valorActual: '$1500',
      monto: '$2500',
      tiempoCierre: '2 horas restantes',
    },
    // Agregar más lotes según sea necesario
  ];

  return (
    <div>
      <h2>Lotes en Subasta</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {lotes.map((lote, index) => (
          <Card key={index}>
            <LoteNumber>{lote.numero}</LoteNumber>
            <Slider fotos = {lote.fotos}/>
            <PriceContainer>
              <div>Valor Actual: {lote.valorActual}</div>
              <div>Monto: {lote.monto}</div>
            </PriceContainer>
            <TimeLeft>Tiempo de cierre: {lote.tiempoCierre}</TimeLeft>
            <MoreInfoButton>Más Información</MoreInfoButton>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListaLotes;
