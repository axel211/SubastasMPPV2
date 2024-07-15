import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Usa la instancia configurada de Axios
import { Form, Button, Container, Card, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css'; // Importa el archivo CSS
import LogoMPP from '../Image/BannerSubasta/LogoMPP.svg';

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
        <Container className="login-container">
            <Card className="login-card">
                <div className="login-card-right">
                    <h2 className="text-center">¡Bienvenido!</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese su correo electronico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Ingresar
                        </Button>
                    </Form>
                    <a href="/forgot-password" className="forgot-password">
                        ¿Has olvidado tu contraseña?
                    </a>
                    <a href="/registro" className="register-btn mt-4">
                        Registrarse
                    </a>
                </div>
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
