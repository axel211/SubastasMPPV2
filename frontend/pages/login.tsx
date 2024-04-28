import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from 'components/Button';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.username)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    } else {
      setEmailError('');
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/autenticar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // Asumiendo que la respuesta es un objeto JSON
      console.log('Login successful, data:', data);
      localStorage.setItem('authToken', data.token); // Almacenamiento del token
      // Aquí puedes decidir qué hacer con los datos del usuario
      router.push('/registerSubasta');
    } catch (error) {
      console.error('Login error:', error);
      setEmailError(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <FormTitle>Bienvenido de nuevo</FormTitle>
        <FormInput
          type="text"
          name="username"
          placeholder="Correo electronico"
          value={formData.username}
          onChange={handleChange}
          required
        />
         {emailError &&
         <PasswordTextContainer>
          <ErrorMessage>{emailError}</ErrorMessage>
         </PasswordTextContainer>
          }
        <FormInput
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <PasswordTextContainer>
          <p>
            ¿No recuerdas tu contraseña?
            <RecoverLink href = '/recuperar'>Recuperala aqui  </RecoverLink>
          </p>
        </PasswordTextContainer>
        <Button onClick={handleSubmit}>Iniciar Sesión</Button>
        <RegisterTextContainer>
          <p>
            ¿No tienes una cuenta?
          </p>
          <a href="/register"> Registrate aqui </a>
        </RegisterTextContainer>
      </LoginForm>
    </LoginContainer>
  );
};

// Estilos con styled-components
// Contenedor para el texto de recuperar contraseña
const PasswordTextContainer = styled.div`
  width: 50%; /* Ajusta el ancho según sea necesario */
  margin-bottom: 10px;
  text-align: left; /* Alinea el texto a la izquierda */
`;

const RegisterTextContainer = styled.div`
  width: 50%; /* Ajusta el ancho según sea necesario */
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center; /* Alinea el texto a la izquierda */
`;

const RecoverLink = styled.a`
  text-align: right; /* Alinea el texto a la izquierda */
  color: #007bff;
  margin-left: 140px;
`;


const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -.5rem;
  margin-bottom: 1.5rem;
  text-align: left; /
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 850px;
`;

const LoginForm = styled.form`
width: 800px;
padding: 20px;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
background-color: #fff;
height: 600px;
display: flex;
flex-direction: column;
justify-content: center; /* Centra verticalmente los elementos */
align-items: center; /* Centra horizontalmente los elementos */
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size : 25px;
`;

const FormInput = styled.input`
  width: 50%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const SignupLink = styled.a`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  cursor: pointer;
`;

export default Login;
