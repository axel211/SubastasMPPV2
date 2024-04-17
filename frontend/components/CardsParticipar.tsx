import React from 'react';
import styled from 'styled-components';
import register from 'public/cardsParticipar/Register.svg'
import habilitado from 'public/cardsParticipar/Habilitado.svg'
import lote from 'public/cardsParticipar/Lote.svg'
// Estilos para el card principal
const CardWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  background: #f6f6f6 ; 
`;

// Estilos para el título del card
const CardTitle = styled.h6`
  margin-top : 0px ;    
  color: #3182ce;
  font-size: 15px;
  margin-bottom: 8px;
`;
const CardDescripcion = styled.h2`
  color: black;
  font-size: 24px;
  margin-bottom: 16px;
`;
// Estilos para las subcards
const SubCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  background: transparent ; 
`;

const SubCard = styled.div`
    flex: 1 1 calc(33.33% - 16px);
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
    min-height: 200px; /* Establecer altura mínima */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left ; 

    &:hover {
        background-color: #00224a; /* Cambiar color al pasar el mouse */
      }
`;

const SubCardTitle = styled.h4`
  color: #4a5568;
  font-size: 20px;
  margin-bottom: 8px;
  text-align : center ; 
  ${SubCard}:hover & {
    color: white;
  }
`;

const SubCardText = styled.p`
    margin-top: 20px; 
  color: #4a5568;
  font-size: 16px;
  ${SubCard}:hover & {
    color: #F4F6F7 ; 
  }
`;

const SubCardLink = styled.a`
  display: block;
  text-align: left; /* Alinear texto al centro */
  margin-top: 15px; /* Espacio superior */
  margin-bottom: auto ;
  color: #3182ce; /* Color del enlace */
  text-decoration: none; /* Quitar subrayado */
  transition: color 0.3s ease; /* Transición suave */
  font-size : 15px ; 
  &:hover {
    color: #4a5568; /* Cambiar color al pasar el cursor */
  }
  ${SubCard}:hover & {
    color: #3498DB ; 
  }
`;

const SubCardContent = styled.div`
  flex-grow: 1;
`;
const SubCardLinkWrapper = styled.div`
  margin-top: auto;
`;

const SubCardImage = styled.img`
  display: block;
  margin: 0 auto; /* Esto centra la imagen horizontalmente */
`;

function CardsParticipar() {
  return (
    <CardWrapper id="aboutus-section">
      <CardTitle>Para participar</CardTitle>
      <CardDescripcion>Regístrate, habilítate y participa.</CardDescripcion>
      <SubCardWrapper>
        <SubCard>
          <SubCardContent>
            <SubCardTitle>Regístrate</SubCardTitle>
            <SubCardImage src={register} alt="Register" width="100" height="100" />
            <SubCardText>Llena nuestro formulario y crea una cuenta para que puedas participar en todas las subastas.</SubCardText>
          </SubCardContent>
          <SubCardLinkWrapper>
            <SubCardLink href="Register">Registrate</SubCardLink>
          </SubCardLinkWrapper>
        </SubCard>
        <SubCard>
          <SubCardContent>
            <SubCardTitle>Habilítate</SubCardTitle>
            <SubCardImage src={habilitado} alt="Habilitado" width="100" height="100" />
            <SubCardText>Para habilitarte en la subasta actual tienes que cumplir con las bases del concurso.</SubCardText>
          </SubCardContent>
          <SubCardLinkWrapper>
            <SubCardLink href="Habilitar">Habilítate</SubCardLink>
          </SubCardLinkWrapper>
        </SubCard>
        <SubCard>
          <SubCardContent>
            <SubCardTitle>Lotes</SubCardTitle>
            <SubCardImage src={lote} alt="Lote" width="100" height="100" />
            <SubCardText>Lista de lotes que se subastarán el día 24 de marzo</SubCardText>
          </SubCardContent>
          <SubCardLinkWrapper>
            <SubCardLink href="Lotes">Lotes</SubCardLink>
          </SubCardLinkWrapper>
        </SubCard>
      </SubCardWrapper>
    </CardWrapper>
  );
}

export default CardsParticipar;
