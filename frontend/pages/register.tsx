import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import FormInputPersonalizado from 'components/FormInputPersonalizado';
import axios from 'axios' ; 


const Register = () => {
  const [formData, setFormData] = useState({
    userType: 'natural',
    // Datos comunes
    email: '',
    password: '',
    confirmPassword: '',
    // Persona natural
    names: '',
    lastNames: '',
    dni: '',
    birthDate: '',
    sex: '',
    civilStatus: '',
    phone: '',
    // Persona con RUC
    commercialName: '',
    ruc: '',
    economicActivity: '',
    rucPhone: '',
    // Dirección
    department: '',
    province: '',
    district: '',
    address: '',
    number: '',
    floor: '',
  });



  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'termsChecked' || name === 'privacyChecked' ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Solo para propósitos de demostración
    // Aquí puedes implementar la lógica para enviar los datos de registro al servidor
    try{

      const data = {
        usuarioDTO: {
          email: formData.email,
          password: formData.password,
          rol: 'Funcionario'
        },
        personaDTO: {
          tipo: formData.userType,
          dni: formData.dni,
          nombres: formData.names,
          apellido: formData.lastNames,
          fechaNacimiento: formData.birthDate,
          sexo: formData.sex,
          estadoCivil: formData.civilStatus,
          telefono: formData.phone,
          departamento: formData.department,
          provincia: formData.province,
          distrito: formData.district,
          direccion: formData.address,
          numero: formData.number,
          activo: true
        }
      };

      const response = await axios.post('http://localhost:8080/api/usuarios/registrar', data);

      console.log(response.data); // Muestra la respuesta del servidor


    }catch(error){
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const botonPresionado = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("BOTON PRESIONADO")
  }


  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <FormTitle>Registro de Usuario</FormTitle>
        
        <RadioButtonGroup>
          <input
            type="radio"
            id="natural"
            name="userType"
            value="natural"
            checked={formData.userType === 'natural'}
            onChange={handleChange}
          />
          <label htmlFor="natural">Persona Natural</label>

          <input
            type="radio"
            id="ruc"
            name="userType"
            value="ruc"
            checked={formData.userType === 'ruc'}
            onChange={handleChange}
          />
          <label htmlFor="ruc">Persona con RUC</label>
        </RadioButtonGroup>

       
        

        {/* Subtítulo y datos personales */}
        {formData.userType === 'natural' && (
          <div>
            <FormSubtitle>Datos Personales</FormSubtitle>
            <FormRow>
              <FormInput
                type="text"
                name="names"
                placeholder="Nombres"
                value={formData.names}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                name="lastNames"
                placeholder="Apellidos"
                value={formData.lastNames}
                onChange={handleChange}
                required
              />
            </FormRow>
            <FormRow>
              <FormInputPersonalizado
                type="text"
                name="dni"
                placeholder="DNI"
                value={formData.dni}
                onChange={handleChange}
                maxLength={8}
                required
              />
              <FormInput
                type="date"
                name="birthDate"
                placeholder="Fecha de Nacimiento"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </FormRow>
            <FormRow>
              <FormSelect
                name="sex"
                onChange={handleChange}
                value={formData.sex}
                required
              >
                <option value="">Seleccionar Sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </FormSelect>
              <FormSelect
                name="civilStatus"
                onChange={handleChange}
                value={formData.civilStatus}
                required
              >
                <option value="">Seleccionar Estado Civil</option>
                <option value="soltero">Soltero(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viudo">Viudo(a)</option>
              </FormSelect>
            </FormRow>
            <FormInput
              type="tel"
              name="phone"
              placeholder="Teléfono celular"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {formData.userType === 'ruc' && (
          <div>
          <FormSubtitle>Registro de entidad legal</FormSubtitle>
          <FormRow>
            <FormInput
              type="text"
              name="nombreComercial"
              placeholder="Nombre comercial"
              value={formData.commercialName}
              onChange={handleChange}
              required
            />
            <FormInput
              type="text"
              name="ruc"
              placeholder="Ruc"
              value={formData.ruc}
              onChange={handleChange}
              required
            />
          </FormRow>
          <FormRow>
            <FormInput
              type="text"
              name="actividadEconomica"
              placeholder="Actividad económica"
              value={formData.economicActivity}
              onChange={handleChange}
              required
            />
            <FormInput
              type="date"
              name="telefono"
              placeholder="Telefono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormRow>
          
        </div>
        )}

        {/* Datos comunes */}

         {/* Dirección */}
         <div>
         <FormSubtitle>Direccion</FormSubtitle>

        <FormRow>
              <FormInput
                type="text"
                name="departamento"
                placeholder="Departamento"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                name="provincia"
                placeholder="Provincia"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </FormRow>
            <FormRow>
              <FormInput
                type="text"
                name="distrito"
                placeholder="Distrito"
                value={formData.district}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                name="direccion"
                placeholder="Direccion"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormRow>

            <FormRow>
              <FormInput
                type="text"
                name="numero"
                placeholder="Numero"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                name="piso"
                placeholder="Piso"
                value={formData.floor}
                onChange={handleChange}
                required
              />
            </FormRow>
        </div>

         
         <div>
            <FormSubtitle>Datos de acceso</FormSubtitle>
            <FormRow>
            <FormInput
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
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
             </FormRow>
            <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            />
        </div>

        <CheckboxContainer>
          <CheckboxInput
            type="checkbox"
            id="terms"
            name="termsChecked"
            checked={formData.termsChecked}
            onChange={handleChange}
          />
          <CheckboxLabel htmlFor="terms">Acepto los términos y condiciones</CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxInput
            type="checkbox"
            id="privacy"
            name="privacyChecked"
            checked={formData.privacyChecked}
            onChange={handleChange}
          />
          <CheckboxLabel htmlFor="privacy">Acepto la política de privacidad</CheckboxLabel>
        </CheckboxContainer>
        
        <ButtonContainer>
        <Button onClick={handleSubmit}>Registrarse</Button>
        </ButtonContainer>
        
      </RegisterForm>
      
    </RegisterContainer>
  );
};

// Estilos con styled-components

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Espacio desde arriba */
`;
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegisterForm = styled.form`
  width: 800px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const FormSubtitle = styled.h3`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: calc(50% - 10px); /* Ajusta el ancho para dos inputs por fila */
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: calc(50% - 10px); /* Ajusta el ancho para dos selects por fila */
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px; /* Espacio entre elementos */
`;

const RadioButtonGroup = styled.div`
  margin-bottom: 20px;

  input[type='radio'] {
    margin-right: 10px;
  }
`;

export default Register;
