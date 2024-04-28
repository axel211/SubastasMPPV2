import AuctionTable from 'components/AuctionTable';
import UserCardMenu from 'components/UserCardMenu';
import styled from 'styled-components';
import React, { useState } from 'react';
import UserData from 'components/UserData';
import Page from 'components/Page';
import withAuth from 'components/withAuth'
// Estilos para el contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const CardContainer = styled.div`
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
    width: 750px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const RegisterLotes = () => {

  const userData = {
    names: 'Juan',
    lastNames: 'Pérez',
    dni: '12345678',
    birthDate: '01/01/1990',
    address: 'Calle Principal 123',
    email: 'juan@example.com',
    phone: '987654321',
    password: '********', // Solo para mostrar, no es seguro mostrar la contraseña real
  };
      // Estado para controlar la opción seleccionada
 const [selectedOption, setSelectedOption] = useState<'datosPersonales' | 'mostrarTabla'>('datosPersonales');

  // Función para manejar el clic en la opción del menú
  const handleOptionClick = (option:'datosPersonales' | 'mostrarTabla') => {
    setSelectedOption(option);
  };

  // Función para renderizar el contenido basado en la opción seleccionada
  const renderContent = () => {
    if (selectedOption === 'datosPersonales') {
      return <UserData userData={userData} />
    } else if (selectedOption === 'mostrarTabla') {
      return <AuctionTable />;
    }
  };
  return (

    <PageContainer>
        <CardContainer>
          <UserCardMenu onOptionClick={handleOptionClick} />
      
      <Content>
      {renderContent()}
      </Content>
      </CardContainer>
    </PageContainer>


  );
}

export default withAuth(RegisterLotes) ; 