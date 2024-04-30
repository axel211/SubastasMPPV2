import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterForm from './pages/RegisterForm';
import LandingPage from './pages/LandingPage';
// otros imports...

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/dashboard" element={
                  <PrivateRoute>
                  <Dashboard />
                  </PrivateRoute>
                  } />
        // otras rutas...
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
