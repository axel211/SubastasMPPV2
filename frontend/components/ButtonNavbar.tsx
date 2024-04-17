import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = PropsWithChildren<{ transparent?: boolean }>;

const ButtonNavbar = styled.button`
    font-size: 1.5rem; /* Tamaño de texto grande */
    font-weight: 600; /* Grosor de la fuente */
    background-color: transparent; /* Color de fondo transparente */
    padding: 1rem 1.5rem; /* Espaciado interno del botón */
    padding: 1rem 2rem; /* Espaciado interno del botón para pantallas grandes */
    border-radius: 20px; /* Hace que el botón sea redondeado */
    cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
    transition: background-color 0.3s, color 0.3s; /* Transiciones suaves */
    margin-left: 1rem ; 

    &:hover {
    background-color: black; /* Cambia el color de fondo al pasar el cursor */
    color: white; /* Cambia el color del texto al pasar el cursor */
    }
`;

export default ButtonNavbar;
