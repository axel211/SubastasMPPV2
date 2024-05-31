import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaEdit } from 'react-icons/fa'; // Importar el ícono de edición
import axios from 'axios';


const CardPerfil = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:8080/api/usuarios/usuario/${user.id}`)
                .then(response => {
                    const transformedData = transformDataToUpperCase(response.data);
                    setUserData(transformedData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const transformDataToUpperCase = (data) => {
        const transformText = (text) => text ? text.toUpperCase() : text;

        return {
            ...data,
            usuarioDTO: {
                ...data.usuarioDTO,
                email: transformText(data.usuarioDTO.email),
                rol: transformText(data.usuarioDTO.rol)
            },
            personaDTO: {
                ...data.personaDTO,
                nombres: transformText(data.personaDTO.nombres),
                apellidos: transformText(data.personaDTO.apellidos),
                dni: transformText(data.personaDTO.dni),
                nombreEmpresa: transformText(data.personaDTO.nombreEmpresa),
                ruc: transformText(data.personaDTO.ruc),
                direccion: transformText(data.personaDTO.direccion),
                telefono: transformText(data.personaDTO.telefono),
                departamento: transformText(data.personaDTO.departamento),
                provincia: transformText(data.personaDTO.provincia),
                distrito: transformText(data.personaDTO.distrito)
            }
        };
    };

    const renderPersonalInfo = () => {
        if (!userData || !userData.personaDTO) return null;

        const { nombres, apellido, dni } = userData.personaDTO;

        return (
            <Card className="mb-3">
                <Card.Header>
                    <Card.Title>Datos Personales</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Nombres:</strong> {nombres}</ListGroup.Item>
                        <ListGroup.Item><strong>Apellidos:</strong> {apellido}</ListGroup.Item>
                        <ListGroup.Item><strong>DNI:</strong> {dni}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    };

    const renderAccountInfo = () => {
        if (!userData || !userData.usuarioDTO) return null;

        const { email , rol } = userData.usuarioDTO;

        return (
            <Card className="mb-3">
                <Card.Header>
                    <Card.Title>Datos de la Cuenta</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Correo:</strong> {email}</ListGroup.Item>
                        <ListGroup.Item><strong>Contraseña:</strong> ******</ListGroup.Item>
                        <ListGroup.Item><strong>Rol:</strong> {rol}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    };

    const renderContactInfo = () => {
        if (!userData || !userData.personaDTO) return null;

        const { direccion, telefono, departamento, provincia, distrito } = userData.personaDTO;

        return (
            <Card className="mb-3">
                <Card.Header>
                    <Card.Title>
                        Datos de Contacto
                        <Button variant="link" className="float-end" onClick={handleEditClick} aria-label="Editar">
                            <FaEdit />
                        </Button>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Dirección:</strong> {direccion}</ListGroup.Item>
                        <ListGroup.Item><strong>Teléfono:</strong> {telefono}</ListGroup.Item>
                        <ListGroup.Item><strong>Departamento:</strong> {departamento}</ListGroup.Item>
                        <ListGroup.Item><strong>Provincia:</strong> {provincia}</ListGroup.Item>
                        <ListGroup.Item><strong>Distrito:</strong> {distrito}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    };

    const handleEditClick = () => {
        // Lógica para editar los datos de contacto
        console.log("Editar datos de contacto");
    };

    if (loading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Cargando...</span></Spinner>;
    }

    if (!userData) {
        return <div>Error al cargar los datos del usuario.</div>;
    }

    return (
        <div>
            {renderPersonalInfo()}
            {renderAccountInfo()}
            {renderContactInfo()}
        </div>
    );
};

export default CardPerfil;
