//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonIcon } from '@ionic/react';
import { playCircle, library, people, list , radio, albums, calendar, earth, logoSoundcloud, logoInstagram, information} from 'ionicons/icons';
import { useParams } from 'react-router-dom';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {AlbumCard, CommunityCard, PlaylistCard} from '../components/Cards';

//Import de datos
import albumsData from '../data/albums.json';

//Import de CSS
import './perfil.css';

//Import de contexto
import { useAuth } from '../contexts/autentificacion';

//Puentes
import api from '../api/api';


const Perfil: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const userTag = localStorage.getItem('userTag'); // Tag del usuario autenticado

    const { tag } = useParams<{ tag: string }>(); // Extrae el parámetro 'tag' desde la URL

    const [profileData, setProfileData] = useState<any>(null); // Datos del perfil
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error
  
    const [username, setUsername] = useState<string>(''); // Nombre de usuario
    const [headerText, setHeaderText] = useState<string>(''); // Texto del header
    const [informacion, setInformacion] = useState<string>(''); // Información adicional
    const [profileImage, setProfileImage] = useState<string | null>(null); // Imagen de perfil
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // Imagen de fondo

  // Efecto para obtener los datos del perfil
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!tag) {
        console.error('No se ha proporcionado un tag de usuario');
        setError('Tag de usuario no encontrado');
        setLoading(false);
        return;
      }

      const encodedUserTag = encodeURIComponent(tag); // Codificar el tag para la URL
      try {
        const response = await api.get(`/perfil/obtener/${encodedUserTag}`); // Petición GET a la API
        console.log('Datos del perfil:', response.data);
        
        setProfileData(response.data); // Guardamos los datos en el estado
      } catch (err) {
        setError('Error al obtener el perfil'); // Manejamos el error
        console.error(err);
      } finally {
        setLoading(false); // Finalizamos el estado de carga
      }
    };

    fetchUserProfile();
  }, [tag]); // El efecto se ejecuta cuando el 'tag' cambia

  // Cuando los datos del perfil cambian, actualiza los estados locales
  useEffect(() => {
    if (profileData) {
      setUsername(profileData.nombre || ''); // Actualiza el nombre
      setHeaderText(profileData.headerText || ''); // Actualiza el texto del header
      setInformacion(profileData.informacion || ''); // Actualiza la información adicional
      setProfileImage(profileData.avatar || null); // Imagen de perfil
      setBackgroundImage(profileData.background || null); // Imagen de fondo
    }
  }, [profileData]); // Este efecto se ejecuta cuando profileData cambia

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
            /* TAB: Música */
            id: 'musica',
            title: 'Música',
            icon: playCircle,
            content: (
                <IonContent className="scrollable">
                    <div className="CardsContainer">
                        {albumsData.filter(album => album.tag === "@minimo").length > 0 ? (
                            albumsData.filter(album => album.tag === "@minimo").map((album, index) => (
                                <AlbumCard key={index} image={album.image} title={album.title} />
                            ))
                        ) : (
                            <h2>No hay álbumes disponibles.</h2>
                        )}
                    </div>
                </IonContent>
            ),
        },
        {
            /* TAB: Listas */
            id: 'list',
            title: 'Listas',
            icon: list,
            content: (
                <IonContent className="scrollable">
                    <div className="playlist-card-container">
                        <PlaylistCard 
                            title="cosas" 
                            subtitle="Creado por: [minimo]" 
                            content="nosequeponer" 
                            image="https://i1.sndcdn.com/artworks-2M8nUwmmzUULy03L-NOmCVg-t500x500.jpg" 
                        />
                    </div>
                </IonContent>
            ),
        },
        {
            /* TAB: Comunidades */
            id: 'comunidades',
            title: 'Comunidades',
            icon: people,
            content: (
                <div className='community-container'>
                    <CommunityCard 
                        topImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp08RZAoIfJnOtiDVX0C8Bdm3xw6op5aaRlg&s" 
                        image="https://i.redd.it/gb1ccyushjf81.png"
                        title="DeepRockMusic"
                    />
                    <CommunityCard 
                        topImage="https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs="
                        image="https://balloonhq.com/wp-content/uploads/2024/01/Balloon_HQ_Resize_1920x1080_where_to_get_balloons_filled_with_helium.png"
                        title="Los payasos de micro"
                        route='/comunidad'
                    />
                </div>
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
                            <p>{informacion}</p>
                            <h2>Detalles</h2>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={radio} slot="start" />
                                <IonLabel>10 oyentes</IonLabel>
                            </div>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={albums} slot="start" />
                                <IonLabel>3 Álbumes</IonLabel>
                            </div>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={calendar} slot="start" />
                                <IonLabel>Se unió el 12.01.2021</IonLabel>
                            </div>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={earth} slot="start" />
                                <IonLabel>Chile</IonLabel>
                            </div>
                            <h2>Enlaces</h2>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={logoSoundcloud} slot="start" />
                                <IonLabel>Soundcloud</IonLabel>
                            </div>
                            <div className="detail-item">
                                <IonIcon aria-hidden="true" icon={logoInstagram} slot="start" />
                                <IonLabel>Instagram</IonLabel>
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
            <InterfazGeneral>
                <IonContent>
                    {/* CABECERA DE PERFIL */}
                    <IonHeader>
                        <div className="perfil"  style={{backgroundImage: `url(${backgroundImage})`}}>
                            <img className="foto-perfil" src={profileImage} />
                            <div className="info">
                                <h1>{username}</h1>
                                <h2>{tag}</h2>
                                <p>{headerText}</p>
                            </div>
                            {isAuthenticated && userTag !== tag && (
                                <div className="seguir-btn">
                                <BotonGeneral text="Seguir" color="dark" size="small" />
                                </div>
                            )}
                        </div>
                    </IonHeader>
                    {/* CUERPO DE PERFIL */}
                    <IonContent>
                        <TabsNavegacion tabs={tabs} />
                    </IonContent>
                </IonContent>
            </InterfazGeneral>
        </IonPage>
    );
};

export default Perfil;