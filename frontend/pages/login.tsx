import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar los datos de inicio de sesión al servidor
    console.log(formData); // Solo para propósitos de demostración
    // Después de enviar, puedes redirigir a una página de inicio o hacer lo que sea necesario
    router.push('/dashboard'); // Ejemplo de redirección
  };

  return (
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <FormTitle>Iniciar Sesión</FormTitle>
        <FormInput
          type="text"
          name="username"
          placeholder="Nombre de usuario o correo electrónico"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormButton type="submit">Iniciar Sesión</FormButton>
        <SignupLink onClick={() => router.push('/registro')}>¿No tienes cuenta? Regístrate aquí</SignupLink>
      </LoginForm>
    </LoginFormContainer>
  );
};

// Estilos con styled-components
const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const FormInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const SignupLink = styled.div`
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
