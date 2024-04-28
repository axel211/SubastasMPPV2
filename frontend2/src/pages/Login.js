import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Utiliza el hook useAuth
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
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
 