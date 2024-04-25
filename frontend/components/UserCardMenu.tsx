import React from 'react';
import styled from 'styled-components';
import cuentaIcono from 'public/IconosMenu/cuentaIcono.svg'
import subastaIcono from 'public/IconosMenu/subastaIcono.svg'
// Estilos para la card de usuario
const UserCardContainer = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

// Estilos para el encabezado de la card
const Header = styled.div`
  padding: 20px;
  text-align: center;
`;

// Estilos para la foto del usuario
const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

// Estilos para el nombre del usuario
const UserName = styled.h3`
  margin: 10px 0;
`;

// Estilos para el email del usuario
const UserEmail = styled.p`
  margin-bottom: 20px;
`;

// Estilos para el menú de opciones
const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

// Estilos para cada opción del menú
const MenuItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size:15px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SubCardImage = styled.img`
margin-right: 10px;
width: 30px; /* Ajusta el ancho según tu diseño */
height: 30px; /* Ajusta la altura según tu diseño */
display: inline-block;
vertical-align: bottom;
`;

type Option = 'datosPersonales' | 'mostrarTabla'; // Definir un tipo para las opciones válidas

// Tipo para la función de clic en la opción del menú
type OptionClickHandler = (option: Option) => void;

// Propiedades del componente UserCardMenu
interface UserCardMenuProps {
  onOptionClick: OptionClickHandler;
}

// Componente de la card de usuario y menú
function UserCardMenu({ onOptionClick }: UserCardMenuProps) {
    const handleOptionClick = (option: Option) => {
        onOptionClick(option);
      };

  return (
    <UserCardContainer>
      <Header>
        <UserAvatar src="URL_DE_LA_IMAGEN_DEL_USUARIO" alt="Avatar" />
        <UserName>Nombre del Usuario</UserName>
        <UserEmail>usuario@example.com</UserEmail>
      </Header>
      <Menu>
        <MenuItem onClick={() => handleOptionClick('datosPersonales')}>
          <SubCardImage src={cuentaIcono}/>Cuenta
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick('mostrarTabla')}>
        <SubCardImage src={subastaIcono}/>Subasta
        </MenuItem>
      </Menu>
    </UserCardContainer>
  );
}

export default UserCardMenu;