import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RegisterLotes = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Aquí puedes utilizar el id para cargar y mostrar los detalles de la subasta
  }, [id]);

  return (
    <div>
      <h1>Detalles de la subasta {id}</h1>
      {/* Aquí puedes renderizar los detalles de la subasta */}
    </div>
  );
};

export default RegisterLotes;