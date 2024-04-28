// withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './authContext';  // Asegúrate de ajustar la ruta si es necesario

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { auth } = useAuth();

    useEffect(() => {
      if (!auth.isAuthenticated) {
        // Redireccionar al usuario al formulario de inicio de sesión si no está autenticado
        router.replace('/login');
      }
    }, [auth.isAuthenticated, router]);

    return auth.isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
