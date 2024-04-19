import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FloatingInputField from './FloatingInputField';
import FloatingComboboxField from './FloatingComboboxField';

const FormContainer = styled.div`
  max-width: 530px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-top : 20px;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &::placeholder {
    color: #999; /* Color del texto del marcador de posición */
  }
`;
const shakeAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.1); }
100% { transform: scale(1); }
`;
const FormButton = styled.button`
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

/* Agregar la animación de shake al hacer clic */
  &:active {
    animation: ${shakeAnimation} 0.3s ease;
  }
`;
const FormFieldRow = styled.div`
  display: flex;
  gap: 10px; /* Espacio entre los elementos */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan en múltiples líneas si no caben en una sola línea */
`;
const RegisterLoteForm = () => {
  const [tipo, setTipo] = useState('');
  const [placa, setPlaca] = useState('');
  const [combustible, setCombustible] = useState('');
  const [año, setAño] = useState('');
  const [condicion, setCondicion] = useState('');
  const [transmision, setTransmision] = useState('');
  const [color, setColor] = useState('');
  const [cilindraje, setCilindraje] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [puertas, setPuertas] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioBase, setPrecioBase] = useState('');
  const [moneda, setMoneda] = useState('');
  const [fotos, setFotos] = useState<File[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a la base de datos o hacer lo que necesites con ellos
    console.log({
      tipo,
      combustible,
      año,
      condicion,
      transmision,
      color,
      cilindraje,
      kilometraje,
      puertas,
      descripcion,
      precioBase,
      moneda,
      fotos,
    });
  };

  return (
    <FormContainer>
    <FormTitle>Registrar Lote</FormTitle>
    <FormField>
      <FormLabel>Tipo:</FormLabel>
      <FloatingComboboxField
        label="Seleccione el tipo de lote"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        options={[
          { value: 'vehiculo', label: 'Vehículo' },
          { value: 'motocicleta', label: 'Motocicleta' },
          { value: 'inmueble', label: 'Inmueble' },
        ]}
      />
    </FormField>

    {tipo === 'inmueble' && (
      <>
        <FormTitle>Descripción</FormTitle>
        <FormField>
          <FormTextarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
          />
        </FormField>
      </>
    )}

    {(tipo === 'vehiculo' || tipo === 'motocicleta') && (
      <>
        <FormTitle>Descripción</FormTitle>
        <FormFieldRow>
          <FloatingInputField label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
          <FloatingInputField label="Combustible" value={combustible} onChange={(e) => setCombustible(e.target.value)} />
          <FloatingInputField label="Año" value={año} onChange={(e) => setAño(e.target.value)} />
        </FormFieldRow>
        <FormFieldRow>
          <FloatingInputField label="Color" value={color} onChange={(e) => setColor(e.target.value)} />
          <FloatingInputField label="Cilindraje" value={cilindraje} onChange={(e) => setCilindraje(e.target.value)} />
          <FloatingInputField label="Kilometraje" value={kilometraje} onChange={(e) => setKilometraje(e.target.value)} />
        </FormFieldRow>
        <FormFieldRow>
          <FloatingInputField label="Condicion" value={color} onChange={(e) => setColor(e.target.value)} />
          <FloatingInputField label="Trasnmision" value={transmision} onChange={(e) => setTransmision(e.target.value)} />
        </FormFieldRow>
        <FormFieldRow>
        <FormTextarea
            placeholder='Descripcion general del vehiculo!'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
          />
        </FormFieldRow>
      </>
    )}

    <FormTitle>Precio Base</FormTitle>
    <FormField>
    <FormLabel>Moneda:</FormLabel>
    <FloatingComboboxField
        label="Seleccione la moneda"
        value={moneda}
        onChange={(e) => setMoneda(e.target.value)}
        options={[
          { value: 'USD', label: 'USD' },
          { value: 'PEN', label: 'PEN' },
        ]}
      />
          <FloatingInputField label="Precio base" value={precioBase} onChange={(e) => setPrecioBase(e.target.value)} />
    </FormField>

    <FormButton type="submit">Registrar</FormButton>
  </FormContainer>
  );
};

export default RegisterLoteForm;
