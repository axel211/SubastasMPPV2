import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';

// Estilos para el sidebar
const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  background-color: #f6f6f6;
  width: 300px;
  height: 100vh;
  padding: 24px;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-300px')};
  transition: left 0.3s ease;
  z-index: 999;
`;

// Estilos para el botón de menú
const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1000;
`;

// Estilos para el título del sidebar
const SidebarTitle = styled.h2`
  color: #3182ce;
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
`;

// Estilos para el contenedor de la imagen y los datos del usuario
const UserInfoContainer = styled.div`
  text-align: center;
`;

// Estilos para la imagen del usuario
const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

// Estilos para los datos del usuario
const UserInfo = styled.div`
  color: #4a5568;
`;

// Estilos para la lista del sidebar
const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 16px;
`;

const SidebarLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: #4a5568;
  }
`;

function SidebarUser() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/*<MenuButton onClick={toggleMenu}>
        <FiMenu size={24} />
      </MenuButton>*/}
      <SidebarWrapper isOpen={isOpen}>
        <SidebarTitle>Menú</SidebarTitle>
        <UserInfoContainer>
          <UserImage src="/user-avatar.jpg" alt="User Avatar" />
          <UserInfo>
            <p>Nombre de Usuario</p>
            <p>usuario@example.com</p>
            <p>Rol del Usuario</p>
          </UserInfo>
        </UserInfoContainer>
        <SidebarList>
          <SidebarItem>
            <SidebarLink href="#">Opción 1</SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="#">Opción 2</SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="#">Opción 3</SidebarLink>
          </SidebarItem>
        </SidebarList>
      </SidebarWrapper>
    </>
  );
}

export default SidebarUser;
