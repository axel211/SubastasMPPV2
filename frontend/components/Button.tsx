import { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

type ButtonProps = PropsWithChildren<{ transparent?: boolean }>;


const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
const Button = styled.a<ButtonProps>`
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

/* Agregar estilos adicionales para cuando el botón está deshabilitado */
&.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

&:active {
  animation: ${clickAnimation} 0.1s ease;
}
`;

export default Button;
