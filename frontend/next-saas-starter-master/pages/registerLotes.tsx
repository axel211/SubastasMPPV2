import AuctionTable from 'components/AuctionTable';
import UserCardMenu from 'components/UserCardMenu';
import styled from 'styled-components';
import React, { useState } from 'react';
// Estilos para el contenedor principal
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

// Estilos para el card de usuario
const UserCard = styled.div`
  width: 400px;
  /* Estilos adicionales para el card de usuario */
`;

// Estilos para el contenido restante
const Content = styled.div`
  width: 800px;
  /* Estilos adicionales para el contenido */
`;

export default function RegisterLotes() {
      // Estado para controlar la opción seleccionada
 const [selectedOption, setSelectedOption] = useState<'datosPersonales' | 'mostrarTabla'>('datosPersonales');

  // Función para manejar el clic en la opción del menú
  const handleOptionClick = (option:'datosPersonales' | 'mostrarTabla') => {
    setSelectedOption(option);
  };

  // Función para renderizar el contenido basado en la opción seleccionada
  const renderContent = () => {
    if (selectedOption === 'datosPersonales') {
      return <p>Contenido de Datos Personales</p>;
    } else if (selectedOption === 'mostrarTabla') {
      return <AuctionTable />;
    }
  };
  return (
    <Container>
      <UserCard>
        <UserCardMenu onOptionClick={handleOptionClick} />
      </UserCard>
      <Content>
      {renderContent()}
      </Content>
    </Container>
  );
}
