import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para el fondo oscuro del modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Estilos para el contenedor del modal
const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`;

// Estilos para el título del modal
const ModalTitle = styled.h3`
  text-align: center;
`;

// Estilos para el formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Estilos para los campos del formulario
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

// Estilos para los botones del formulario
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
`;

const CreateButton = styled(Button)`
  background-color: #3182ce;
  color: #fff;
`;

// Propiedades del componente Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Componente de Modal
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a donde desees
    console.log({ nombre, fechaCierre, descripcion });
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Overlay>
          <ModalContainer>
            <ModalTitle>Crear una subasta</ModalTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nombre">Nombre:</Label>
                <Input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fechaCierre">Fecha de Cierre:</Label>
                <Input
                  type="date"
                  id="fechaCierre"
                  value={fechaCierre}
                  onChange={(e) => setFechaCierre(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="descripcion">Descripción:</Label>
                <Input
                  type="text"
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </FormGroup>
              <ButtonContainer>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                <CreateButton type="submit">Crear</CreateButton>
              </ButtonContainer>
            </Form>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
