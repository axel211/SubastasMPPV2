import React, { useState } from 'react';
import styled from 'styled-components';

// Estilo para el campo de entrada
const InputField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  font-size : 12px ; 
  height: 40px;
  &:focus {
    border-color: #007bff;
  }
`;

// Estilo para la etiqueta flotante
const FloatingLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: top left;
  transform: ${(props) => (props.hasContent ? 'translateY(-50%) scale(0.8)' : 'none')};
`;

// Componente de campo de entrada con etiqueta flotante
const FloatingInputField = ({ label, value, onChange }: { label: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div style={{ position: 'relative' }}>
      <InputField
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <FloatingLabel hasContent={value || isFocused}>{label}</FloatingLabel>
    </div>
  );
};

export default FloatingInputField;
