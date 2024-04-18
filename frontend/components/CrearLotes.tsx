import React, { useState } from 'react';
import styled from 'styled-components';
import FloatingInputField from './FloatingInputField';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
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

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const RegisterLoteForm = () => {
  const [tipo, setTipo] = useState('');
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
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    
    <FormContainer>
      <FormTitle>Registrar Lote</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Tipo:</FormLabel>
          <FormSelect value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccionar Tipo</option>
            <option value="vehiculo">Vehículo</option>
            <option value="motocicleta">Motocicleta</option>
            <option value="inmueble">Inmueble</option>
          </FormSelect>
        </FormField>
        {(tipo === 'vehiculo' || tipo =='motocicleta') && (
          <>
           <>
           <FloatingInputField label="Nombre" value={inputValue} onChange={handleChange} />
            <FormField>
              <FormLabel>Combustible:</FormLabel>
              <FormInput
                type="text"
                value={combustible}
                onChange={(e) => setCombustible(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Año:</FormLabel>
              <FormInput
                type="text"
                value={año}
                onChange={(e) => setAño(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Condición:</FormLabel>
              <FormInput
                type="text"
                value={condicion}
                onChange={(e) => setCondicion(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Transmisión:</FormLabel>
              <FormInput
                type="text"
                value={transmision}
                onChange={(e) => setTransmision(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Color:</FormLabel>
              <FormInput
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Cilindraje:</FormLabel>
              <FormInput
                type="text"
                value={cilindraje}
                onChange={(e) => setCilindraje(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Kilometraje:</FormLabel>
              <FormInput
                type="text"
                value={kilometraje}
                onChange={(e) => setKilometraje(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel>Puertas:</FormLabel>
              <FormInput
                type="text"
                value={puertas}
                onChange={(e) => setPuertas(e.target.value)}
              />
            </FormField>
          </>
          </>
        )}
        {tipo === 'inmueble' && (
          <FormField>
            <FormLabel>Descripción:</FormLabel>
            <FormTextarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
            />
          </FormField>
        )}
        <FormField>
          <FormLabel>Precio Base:</FormLabel>
          <FormInput
            type="text"
            value={precioBase}
            onChange={(e) => setPrecioBase(e.target.value)}
          />
        </FormField>
        <FormField>
          <FormLabel>Moneda:</FormLabel>
          <FormInput
            type="text"
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
          />
        </FormField>
        <FormField>
          <FormLabel>Fotos:</FormLabel>
          <FormInput
            type="file"
            multiple
            onChange={(e) => setFotos(Array.from(e.target.files || []))}
          />
        </FormField>
        <FormButton type="submit">Registrar</FormButton>
      </form>
    </FormContainer>
  );
};

export default RegisterLoteForm;
