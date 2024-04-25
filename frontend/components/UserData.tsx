import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const UserData = ({ userData }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    phone: userData.phone,
    password: userData.password,
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los datos editados
    console.log('Datos editados:', editedData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <UserContainer>
        <SubastaTitle>Cuenta </SubastaTitle>
      <Card>
        <CardTitle>Datos Personales</CardTitle>
        <CardContent>
          <p><strong>Nombre:</strong> {userData.names} {userData.lastNames}</p>
          <p><strong>DNI:</strong> {userData.dni}</p>
          <p><strong>Cumpleaños:</strong> {userData.birthDate}</p>
          <p><strong>Dirección:</strong> {userData.address}</p>
        </CardContent>
      </Card>

      <Card>
        <CardTitle>Datos de la Cuenta</CardTitle>
        <CardContent>
          <p><strong>Email:</strong> {userData.email}</p>
          {editMode ? (
            <>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={editedData.phone}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={editedData.password}
                onChange={handleChange}
              />
              <Button onClick={handleSave}>Guardar</Button>
            </>
          ) : (
            <>
              <p><strong>Teléfono:</strong> {userData.phone}</p>
              <p><strong>Contraseña:</strong> ********</p>
              <Button onClick={handleEdit}>Editar</Button>
            </>
          )}
        </CardContent>
      </Card>
    </UserContainer>
  );
};

// Estilos con styled-components


const SubastaTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  font-size: 30px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column; /* Cambia la dirección a una columna */
  gap: 20px;
`;

const Card = styled.div`
  width: 650px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;

const CardContent = styled.div`
  p {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default UserData;
