import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom'; // Importa Navigate
import ModalCreateSubasta from './ModalCreateSubasta';
import Link from 'next/link'
// Estilos para el contenedor de la tabla de subastas
const AuctionTableWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
`;

// Estilos para el título de la tabla
const TableTitle = styled.h2`
  text-align: left;
  margin-bottom: 20px;
`;

// Estilos para la tabla
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Estilos para las celdas de la tabla
const Th = styled.th`
  background-color: #3182ce;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

// Estilo para las filas impares de la tabla
const TableRow = styled.tr`
  background-color: ${props => props.even ? "#f2f2f2" : "white"};
`;

// Estilos para el contenedor del botón de crear subasta
const CreateButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

// Estilos para el icono del botón
const CreateButtonIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

// Estilos para el texto del botón
const CreateButtonText = styled.span`
  font-size: 16px;
`;

// Función para generar datos ficticios de subastas
const generateFakeSubastas = (cantidad: number) => {
  const subastas = [];
  for (let i = 1; i <= cantidad; i++) {
    subastas.push({
      id: i,
      nombre: `Subasta ${i}`,
      fechaCreacion: new Date().toLocaleDateString(),
      fechaCierre: new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString(), // Fecha aleatoria en los próximos 10 días
      estado: i % 2 === 0 ? 'Finalizado' : 'Activo' // Estado alternado entre "Activo" y "Finalizado"
    });
  }
  return subastas;
}

function AuctionTable() {
  // Generar datos ficticios de subastas
  const subastas = generateFakeSubastas(10); // Generar 10 subastas ficticias

  // Estado para controlar la apertura y cierre del modal
  const [modalOpen, setModalOpen] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Función para manejar la redirección a la página de la subasta correspondiente
  const handleRedirectToSubasta = (id:number) => {
    console.log(`/registerLotes/${id}`)
    return <Navigate to={`/registerLotes/${id}`} replace />;
  };

  return (
    <AuctionTableWrapper>
      <TableTitle>Subastas</TableTitle>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Fecha de Creación</Th>
            <Th>Fecha de Cierre</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th> {/* Nueva columna para el botón */}
          </tr>
        </thead>
        <tbody>
          {subastas.map((subasta, index) => (
            <TableRow key={index} even={index % 2 === 0}>
              <Td>{subasta.id}</Td>
              <Td>{subasta.nombre}</Td>
              <Td>{subasta.fechaCreacion}</Td>
              <Td>{subasta.fechaCierre}</Td>
              <Td>{subasta.estado}</Td>
              {/* Mostrar el botón solo si el estado es "Activo" */}
              <Td>     {subasta.estado === "Activo" && (
                  <Link href={`/subastaMenu/${subasta.id}`}>
                    <a>Acción</a>
                  </Link>
                )}</Td>
              
            </TableRow>
          ))}
        </tbody>
      </Table>
      <CreateButtonContainer onClick={handleOpenModal}>
        <CreateButtonIcon>+</CreateButtonIcon>
        <CreateButtonText>Crear una nueva subasta</CreateButtonText>
      </CreateButtonContainer>
      {/* Modal para crear una nueva subasta */}
      <ModalCreateSubasta isOpen={modalOpen} onClose={handleCloseModal}>
        {/* Contenido del modal aquí */}
      </ModalCreateSubasta>
    </AuctionTableWrapper>
  );
}

export default AuctionTable;
