import styled from 'styled-components';

// Estilo para el campo de entrada
const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease; /* Agregar transición para animación */
  &:focus {
    border-color: #007bff;
  }
`;

// Estilo para la etiqueta flotante
const FloatingLabel = styled.label<{ hasContent: boolean }>`
  position: absolute;
  top: ${(props) => (props.hasContent ? '-10px' : '50%')};
  left: 5px;
  transform: ${(props) => (props.hasContent ? 'translateY(0)' : 'translateY(-50%)')};
  background-color: #fff;
  padding: 0 5px;
  transition: top 0.3s, transform 0.3s;
`;

// Componente de campo de entrada con etiqueta flotante
const FloatingInputField = ({ label, value, onChange }: { label: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const hasContent = value.length > 0;
  
  return (
    <div style={{ position: 'relative' }}>
      <InputField type="text" value={value} onChange={onChange} />
      <FloatingLabel hasContent={hasContent}>{label}</FloatingLabel>
    </div>
  );
};

export default FloatingInputField ; 