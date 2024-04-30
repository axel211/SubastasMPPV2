import React from 'react';
import ReactDOM from 'react-dom/client';  // Asegúrate de usar la API correcta de React 18 si es el caso
import { BrowserRouter as Router } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
</React.StrictMode>
);
