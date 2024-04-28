import React, { useState } from 'react';
import styled from 'styled-components';

const FormInput = ({ type, name, placeholder, value, onChange , maxLength, required }) => {
  const handleChange = (event) => {
    // Filtrar caracteres no numéricos
    const numericValue = event.target.value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0,maxLength);
    // Llamar a la función onChange con el nuevo valor numérico
    onChange({
      target: {
        name: name,
        value: truncatedValue
      }
    });
  };



  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      required={required}
    />
  );
};

const StyledInput = styled.input`
  width: calc(50% - 10px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default FormInput;
