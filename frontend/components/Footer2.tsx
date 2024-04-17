import React from 'react';
import styled from 'styled-components';

// Estilos para el footer principal
const FooterWrapper = styled.div`
  width: 100%;
  background-color: #000;
`;

// Estilos para el contenido del footer
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 16px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Estilos para los elementos del footer
const FooterItem = styled.div`
  color: #fff;
  & h3 {
    font-size: ${props => props.isFirst ? '24px' : '20px'}; // Tamaño de fuente diferente para la primera columna
    font-weight: bold;
    margin-bottom: 20px;
  }
  & ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  & li {
    margin-bottom: 10px;
  }
  & a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;


// Estilos para el contenedor del footer inferior
const FooterBottomWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px 24px;
`;

// Estilos para el contenido del footer inferior
const FooterBottomContent = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Estilos para el texto de los derechos reservados y enlaces de políticas y términos
const FooterBottomText = styled.h3`
  color: #fff;
  font-size: 10px;
  margin: 0;
  text-align: center;
  @media (min-width: 768px) {
    text-align: start;
  }
`;

const FooterBottomLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const FooterBottomLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 6px;
  &:hover {
    text-decoration: underline;
  }
`;
function Footer2() {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterItem isFirst>
          <h3>Municipalidad Provincial de Puno</h3>
          <ul>
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
          </ul>
        </FooterItem>
        <FooterItem>
          <h3>Últimas publicaciones</h3>
          <ul>
            <li>
              <a href="/">Remate vehicular 13 de octubre 2023</a>
            </li>
            <li>
              <a href="/">Remate vehicular 10 de abril 2023</a>
            </li>
          </ul>
        </FooterItem>
        <FooterItem>
          <h3>Contacto</h3>
          <ul>
            <li>
              <a href="/">Dirección: Jr Deustua Nro. 458 - Plaza de Armas</a>
            </li>
            <li>
              <a href="/">Central telefónica: (051)601000</a>
            </li>
          </ul>
        </FooterItem>
        <FooterItem>
          <h3>Horario de atención</h3>
          <ul>
            <li>
              <a href="/">Lunes a viernes</a>
            </li>
            <li>
              <a href="/">Mañana: 08:00 a.m a 12:45 p.m</a>
            </li>
            <li>
              <a href="/">Tarde: 01:45 p.m a 04:00 p.m</a>
            </li>
          </ul>
        </FooterItem>
      </FooterContent>
      <FooterBottomWrapper>
      <FooterBottomContent>
        <FooterBottomText>@2024 - Todos los derechos reservados - <a target="_blank">Municipalidad Provincial de Puno</a></FooterBottomText>
        <FooterBottomLinkWrapper>
          <FooterBottomLink href="/">Políticas de privacidad</FooterBottomLink>
          <FooterBottomLink>|</FooterBottomLink>
          <FooterBottomLink href="/">Términos y condiciones</FooterBottomLink>
        </FooterBottomLinkWrapper>
      </FooterBottomContent>
    </FooterBottomWrapper>
    </FooterWrapper>
  );
}

export default Footer2;
