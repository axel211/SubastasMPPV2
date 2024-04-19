import React from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from './Slider';
import example from 'public/demo-illustration-2.svg'
const Card = styled.div`
  width: calc(33% - 20px);
  margin: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const LoteNumber = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TimeLeft = styled.div`
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const MoreInfoButton = styled.button`
  background-color: rgb(255, 211, 11);
  box-shadow: black 0.1rem 0.1rem;
  width: 171px;
  height: 45px;
  position: relative;
  left: -5px;
  top: -2px;
  padding: 8px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    animation: ${clickAnimation} 0.1s ease;
  }
`;

const ListaLotes = () => {
  const lotes = [
    {
      numero: 'Lote 1',
      fotos: ['example-image-1.jpeg', 'example-image-1.jpeg', 'example-image-1.jpeg'],
      valorActual: '$1000',
      monto: '$2000',
      tiempoCierre: '3 horas restantes',
      rutaFotos: 'public', // Ruta relativa a la carpeta de fotos
    },
    {
      numero: 'Lote 2',
      fotos: ['foto4.jpg', 'foto5.jpg', 'foto6.jpg'],
      valorActual: '$1500',
      monto: '$2500',
      tiempoCierre: '2 horas restantes',
      rutaFotos: '../public/posts/test-article/', // Ruta relativa a la carpeta de fotos
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
            <Slider fotos={lote.fotos.map(foto => lote.rutaFotos + foto)} /> {/* Concatena la ruta de las fotos con el nombre de cada foto */}
            <PriceContainer>
              <div>Valor Actual: {lote.valorActual}</div>
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
