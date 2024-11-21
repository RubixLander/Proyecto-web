//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage,  IonLabel,  IonIcon } from '@ionic/react';
import { chatbubbles,  people, star , calendar, information} from 'ionicons/icons';
import { useParams } from 'react-router-dom';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {AlbumCard, UserCard, DiscussionCard} from '../components/Cards';

//Import de CSS
import './comunidad.css';

//Puentes
import api from '../api/api';


const Comunidad: React.FC = () => {

  const [communityData, setCommunityData] = useState<any>(null); // Datos de la comunidad
  const [communityName, setCommunityName] = useState<string>(''); // Nombre de la comunidad
  const [headerText, setHeaderText] = useState<string>(''); // Texto del header
  const [communityInfo, setCommunityInfo] = useState<string>(''); // Información adicional
  const [avatarImage, setAvatarImage] = useState<string | null>(null); // Imagen del avatar
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // Imagen de fondo
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  
  const { communityId } = useParams<{ communityId: string }>(); // Obtén el ID de la comunidad desde la URL
  

// Efecto para obtener los datos de una comunidad
useEffect(() => {
  console.log('ID de la comunidad desde la URL:', communityId);
  const fetchCommunityData = async () => {
    if (!communityId) {
      console.error('No se ha proporcionado un ID de comunidad');
      setError('ID de comunidad no encontrado');
      setLoading(false);
      return;
    }

    setLoading(true); // Inicia el estado de carga
    setError(null); // Resetea cualquier error previo

    try {
      const response = await api.get(`/comunidad/obtener/${communityId}`); // Petición GET a la API
      console.log('Datos de la comunidad:', response.data);
      setCommunityData(response.data); // Guardamos los datos en el estado
    } catch (err) {
      setError('Error al obtener la comunidad'); // Manejamos el error
      console.error(err);
    } finally {
      setLoading(false); // Finalizamos el estado de carga
    }
  };

  fetchCommunityData();

  // Cleanup: Restablecer estados al cambiar de página o desmontar el componente
  return () => {
    setCommunityData(null);
    setCommunityName('');
    setHeaderText('');
    setCommunityInfo('');
    setAvatarImage(null);
    setBackgroundImage(null);
    setError(null);
  };
}, [communityId]); // El efecto se ejecuta cuando cambia 'communityId'

// Cuando los datos de la comunidad cambian, actualiza los estados locales
useEffect(() => {
  if (communityData) {
    setCommunityName(communityData.nombre || ''); // Actualiza el nombre de la comunidad
    setHeaderText(communityData.headerText || ''); // Actualiza el texto del header
    setCommunityInfo(communityData.informacion || ''); // Actualiza la información adicional
    setAvatarImage(communityData.avatar || null); // Imagen del avatar
    setBackgroundImage(communityData.background || null); // Imagen de fondo
  }
}, [communityData]); // Este efecto se ejecuta cuando communityData cambia

// Renderiza los estados de carga y error
if (loading) {
  return <IonContent><div>Cargando...</div></IonContent>; // Muestra un mensaje de carga
}

if (error) {
  return <IonContent><div>{error}</div></IonContent>; // Muestra un mensaje de error
}
  




    /* CONTENIDO DE PAGINAS DE PERFIL */
    const tabs = [
      {
        /* TAB: Discusiones */
        id: 'discussions',
        title: 'Discusiones',
        icon: chatbubbles,
        content: (
          <IonContent className="scrollable">
            <div className='discussion-container'>
              <DiscussionCard 
                inCommunity={true}  
                communityName="@rubixlander"
                communityImage="https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"
                title="Creen que salga el OST de SilkSong antes que el juego? xd"
                subtitle="22 de Octubre"
                content="Lo del titulo"
                route="/discusion"
              />
              <DiscussionCard 
                inCommunity={true}   
                communityName="@telepath0s"
                communityImage="https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca"
                title="¿Alguien sabe las samples que uso [minimo] en su ultimo EP?"
                subtitle="7 de septiembre"
                content="Especificamente los de LOST IN SPACE PRIMATE "
                route="/discusion"
              />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Destacados */
        id: 'featured',
        title: 'Destacados',
        icon: star,
        content: (
          <IonContent className="scrollable">
            <div className='TabContentContainer'>
              <h4>Destacado por la comunidad!</h4>
            </div>
            <div className="CardsContainer">
              <AlbumCard image={"https://cdn.wikimg.net/en/hkwiki/images/thumb/e/e3/Mainpromo9.jpg/300px-Mainpromo9.jpg"} title={"Hollow Knight (Original Soundtrack)"} subtitle={"Christopher Larkin"} />
              <AlbumCard image={"https://cdn.wikimg.net/en/hkwiki/images/thumb/c/ca/Gods_Nightmare_cover_art.png/300px-Gods_Nightmare_cover_art.png"} title={"Hollow Knight: Gods and Nightmares"} subtitle={"Christopher Larkin"} />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Miembros */
        id: 'members',
        title: 'Miembros',
        icon: people,
        content: (
          <IonContent className="scrollable">
            <div className='TabContentContainer'>
              <h4>Administrador</h4>
            </div>
            <div className='CardsContainer'>
              <UserCard image={"https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"} title={"RubixLander"} subtitle={"@rubixlander"} />
            </div>
            <div className='TabContentContainer'>
              <h4>Miembros</h4>
            </div>
            <div className='CardsContainer'>
              <UserCard image={"https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca"} title={"t e l e p a t h"} subtitle={"@telepath0s"} />
              <UserCard image={"https://f4.bcbits.com/img/0033779152_10.jpg"} title={"[minimo]"} subtitle={"@minimo"} route='/perfil' />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Acerca de */
        id: 'about',
        title: 'Acerca de',
        icon: information,
        content: (
          <IonContent className='scrollable'>
            <div className='about-container'>
              <div className="about-info">
                <h2>Información</h2>
                <p>{communityInfo}</p>
  
                <h2>Detalles</h2>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={people} slot="start" />
                  <IonLabel>3 miembros</IonLabel>
                </div>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={chatbubbles} slot="start" />
                  <IonLabel>2 Discusiones</IonLabel>
                </div>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={calendar} slot="start" />
                  <IonLabel>Creado el 12.01.2021</IonLabel>
                </div>
              </div>
            </div>
          </IonContent>
        ),
      },
    ];
  
    return (
      /* ESTRUCTURA DE PAGINA */
      <IonPage>
        {/* Carga de Interfaz Skelly (Sidebar + Navbar) */}
        <InterfazGeneral>
          <IonContent>
            {/* CABECERA DE PERFIL */}
            <IonHeader>
              <div className="comunidad-cabecera" style={{backgroundImage: `url(${backgroundImage})`}}>
                <img className="comunidad-cabecera-foto" src={avatarImage} />
                <div className="comunidad-cabecera-info">
                <div className="comu-info">
  <h1>{communityName}</h1>
  <p>{headerText}</p>
</div>

                </div>
                <div className="comunidad-cabecera-btn">
                  <BotonGeneral text='Unirse' color='dark' size='small' />
                </div>
              </div>
            </IonHeader>
  
            {/* CUERPO DE PERFIL */}
            <IonContent>
              <TabsNavegacion tabs={tabs} /> {/* CONTENIDO TABS DEFINIDOS ARRIBA */}
            </IonContent>
          </IonContent>
        </InterfazGeneral>
      </IonPage>
    );
  };
  
  export default Comunidad;