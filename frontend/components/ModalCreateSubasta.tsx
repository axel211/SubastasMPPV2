import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`;

const ModalTitle = styled.h3`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewSubastaAdded: () => void; // Nueva prop para notificar cuando se agrega una nueva subasta
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onNewSubastaAdded }) => {
  const [nombre, setNombre] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/subasta', {
        nombre,
        descripcion,
        fechaCreacion: new Date().toISOString(),
        fechaCierre,
        estado: 'Activo'
      });

      // Llama a la función para notificar que se ha agregado una nueva subasta
      onNewSubastaAdded();

      onClose();
    } catch (error) {
      console.error('Error al crear la subasta:', error);
    }
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
