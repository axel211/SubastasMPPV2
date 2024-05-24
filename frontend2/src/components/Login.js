// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Usa la instancia configurada de Axios
import { Form, Button, Container, Card, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/usuarios/autenticar', { email, password });
            login(response.data); // Almacena la información del usuario en el contexto
            navigate('/'); // Redirige a la página principal
        } catch (error) {
            console.error('Error during login:', error);
            setShowModal(true); // Muestra el modal en caso de error
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de autenticación</Modal.Title>
                </Modal.Header>
                <Modal.Body>Usuario y/o contraseña incorrecta.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Login;
