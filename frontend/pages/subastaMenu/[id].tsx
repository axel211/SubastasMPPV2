import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import UserCardMenu from 'components/UserCardMenu';
import ListaLotes from 'components/ListaLotes';
import CrearLotes from 'components/CrearLotes';
import listaParticipantes from 'public/cardsParticipar/ListaParticipantes.svg'
import prueba from 'public/cardsParticipar/prueba.svg'
import carandhouse from 'public/cardsParticipar/carandhouse.svg'
// Estilos para el contenedor principal
const CardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

// Estilos para cada tarjeta
const Card = styled.div`
  width: 300px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 20px;
  margin-bottom: 20px;
`;

// Estilos para el título de la tarjeta
const CardTitle = styled.h3`
  margin-bottom: 10px;
`;

// Estilos para el contenido de la tarjeta
const CardContent = styled.p`
  color: #333;
`;

// Estilos para el contenedor de los botones
const ButtonContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// Estilos para los botones
const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  width: 750px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const SubastaTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  font-size: 30px;
`;

const SubastaName = styled.span`
  flex-grow: 1;
  align-self: center;
  margin: 0 20px;
  font-size: 20px;
  margin-bottom: 10px;
`;

const SubastaId = styled.span`
  text-align: right;
  align-self: flex-end;
  margin: 0 55px;
  font-size: 20px;
  margin-bottom: 10px;
`;

const SubastaInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ExtraContentContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin: 0 20px;
  background-color:  #ffffff ; 
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SubCardImage = styled.img`
  display: block;
  margin: 0 auto; /* Esto centra la imagen horizontalmente */
`;

const RegisterLotes = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'datosPersonales' | 'mostrarTabla' | 'listaLotes' | 'crearLotes'>('datosPersonales');
  const [subastaData, setSubastaData] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Utiliza el ID para obtener los detalles de la subasta desde la API
      axios.get(`http://localhost:8080/api/subasta/${id}`)
        .then(response => {
          setSubastaData(response.data); // Almacena los datos de la subasta en el estado
        })
        .catch(error => {
          console.error('Error al obtener los detalles de la subasta:', error);
        });
    }
    // Aquí puedes utilizar el id para cargar y mostrar los detalles de la subasta
  }, [id]);

    // Función para manejar el clic en la opción del menú
    const handleOptionClick = (option: 'datosPersonales' | 'mostrarTabla' | 'listaLotes' | 'crearLotes') => {
      setSelectedOption(option);
    };

      // Función para renderizar el componente correspondiente
  const renderComponent = () => {
    switch (selectedOption) {
      case 'listaLotes':
        return <ListaLotes />;
      case 'crearLotes':
        return <CrearLotes />;
      default:
        return null;
    }
  };


  return (
    
      <PageContainer>
        <CardContainer>
        <UserCardMenu onOptionClick={handleOptionClick} />
        <Content>
          <SubastaTitle>Subasta </SubastaTitle>
          <SubastaInfoContainer>
            <SubastaName>{subastaData ? subastaData.nombre : 'Cargando...'}</SubastaName>
            <SubastaId>ID: {subastaData ? subastaData.id : 'Cargando...'}</SubastaId>
          </SubastaInfoContainer>
          <Card>
            <CardTitle>Participantes</CardTitle>
            <SubCardImage src={listaParticipantes} alt="Participantes" width="50" height="50" />
            <CardContent>Contenido de los participantes</CardContent>
          </Card>
          <Card>
            <CardTitle>Lotes</CardTitle>
            <SubCardImage src={carandhouse} alt="lotes" width="50" height="50" />
            <CardContent>
              <ButtonContainer>
                <li>
                  <Button onClick={() => handleOptionClick('listaLotes')}>Lista de lotes</Button>
                </li>
                <li>
                  <Button onClick={() => handleOptionClick('crearLotes')}>Crear lotes para la subasta</Button>
                </li>
              </ButtonContainer>
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Cronograma</CardTitle>
            <SubCardImage src={prueba} alt="folder" width="50" height="50" />
            <CardContent>Contenido del cronograma</CardContent>
          </Card>
          <ExtraContentContainer>
            {renderComponent()}
            </ExtraContentContainer>
        </Content>
      </CardContainer>
      
      </PageContainer>
      
    
  );
};

export default RegisterLotes;
