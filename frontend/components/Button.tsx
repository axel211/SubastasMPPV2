import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = PropsWithChildren<{ transparent?: boolean }>;

const Button = styled.a<ButtonProps>`
    font-size: 1rem; /* Tamaño del texto para pantallas pequeñas */
    font-weight: 600; /* Grosor de la fuente */
    padding: 0.75rem 1.5rem; /* Espaciado interno del botón */
    border: none; /* Sin borde */
    background-color: blue; /* Color de fondo */
    color: white; /* Color del texto */
    border-radius: 999px; /* Hace que el botón sea redondeado */
    cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
    transition: background-color 0.3s, box-shadow 0.3s; /* Transiciones suaves */

    /* Estilos para pantallas medianas y grandes */
    @media (min-width: 768px) {
      font-size: 2.25rem; /* Tamaño del texto para pantallas medianas y grandes */
      padding: 1rem 2.5rem; /* Espaciado interno del botón para pantallas medianas y grandes */
    }

    /* Efecto de sombra al pasar el cursor sobre el botón */
    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 255, 0.5); /* Sombra azul */
      background-color: #0066cc; /* Cambia el color de fondo al pasar el cursor */
    }
`;

export default Button;
