import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Subastas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/lote/1">Lote Detalle</Nav.Link> {/* Ejemplo de enlace */}
                </Nav>
                {localStorage.getItem('token') ? (
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Nav.Link href="/login">Login</Nav.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
