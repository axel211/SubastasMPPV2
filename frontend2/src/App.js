import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
// otros imports...

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
                  <PrivateRoute>
                  <Dashboard />
                  </PrivateRoute>
                  } />
        // otras rutas...
      </Routes>
    </div>
  );
}

export default App;
