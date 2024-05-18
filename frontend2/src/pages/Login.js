import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Card, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isAuthenticated = await login(email, password);
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            alert('Login failed');
        }
    };

    return (
        <Container fluid="md" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{ maxWidth: '420px' }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h3 className="mb-3 text-center">Iniciar sesión</h3>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel controlId="floatingInputEmail" label="Email">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel controlId="floatingPassword" label="Contraseña">
                                        <Form.Control
                                            type="password"
                                            placeholder="Contraseña"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar sesión
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
