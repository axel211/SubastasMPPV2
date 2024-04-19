import React, { useState } from 'react';
import styled from 'styled-components';

const SelectField = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  width: 32%;
  padding-right: 30px; /* Espacio para el icono */
  -webkit-appearance: none; /* Eliminar el estilo predeterminado del combobox */
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M112 184l144 144 144-144M256 120v288'/%3E%3C/svg%3E"), linear-gradient(#FFF, #FFF); /* Agregar la flecha hacia abajo */
  background-repeat: no-repeat, repeat;
  background-position: right 10px top 50%, 0 0;
  background-size: 1.5em auto, 100%;
  color: #333; /* Cambiar el color del texto */
  cursor: pointer;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fffff;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: top left;
  transform: ${(props) => (props.hasContent ? 'translateY(-50%) scale(0.8)' : 'none')};
`;

const FloatingComboboxField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div style={{ position: 'relative' }}>
      <SelectField
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value="" disabled hidden></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
      <FloatingLabel hasContent={value || isFocused}>{label}</FloatingLabel>
    </div>
  );
};

export default FloatingComboboxField;
