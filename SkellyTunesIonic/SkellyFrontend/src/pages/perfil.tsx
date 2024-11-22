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


//Import de CSS
import './perfil.css';

//Import de contexto
import { useAuth } from '../contexts/autentificacion';

//Puentes
import api from '../api/api';

interface Album {
    album_id: number;
    coverart: string;
    album_titulo: string;
    artista_nombre: string;
    artista_tag: string;
    primera_cancion_id: number;
  }

  interface Community {
    id: number;
    nombre: string;
    background: string;
    avatar: string;
  }
  


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

    const [albums, setAlbums] = useState<Album[]>([]); // Estado para los álbumes
    const [loadingAlbums, setLoadingAlbums] = useState<boolean>(false); // Estado de carga para álbumes
    const [albumsError, setAlbumsError] = useState<string | null>(null); // Estado de error específico para los álbumes

    const [communities, setCommunities] = useState<Community[]>([]);
    const [loadingCommunities, setLoadingCommunities] = useState<boolean>(false);
    const [communitiesError, setCommunitiesError] = useState<string | null>(null);


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
      setLoading(true); // Inicia el estado de carga
      setError(null); // Resetea cualquier error previo
  
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
  
    // Cleanup: Restablecer estados al cambiar de página o desmontar el componente
    return () => {
      setProfileData(null);
      setUsername('');
      setHeaderText('');
      setInformacion('');
      setProfileImage(null);
      setBackgroundImage(null);
      setError(null);
    };
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

  // Efecto para obtener los álbumes al cargar el componente
  useEffect(() => {
    const fetchAlbums = async () => {
      if (!tag) {
        console.error('No se ha proporcionado un tag de usuario');
        setAlbumsError('Tag de usuario no encontrado');
        setLoadingAlbums(false);
        return;
      }

      const encodedUserTag = encodeURIComponent(tag); // Codificar el tag para la URL

      try {
        setLoadingAlbums(true); // Iniciar la carga de los álbumes
        setAlbumsError(null); // Limpiar cualquier error previo

        // Hacer la petición GET a la API con el tag codificado
        console.log(encodedUserTag);
        const response = await api.get(`/album/albumsUsuario/${encodedUserTag}`);
        console.log('Álbumes obtenidos:', response.data);
        setAlbums(response.data.albums); // Guardar los álbumes en el estado
      } catch (err) {
        console.error('Error al obtener los álbumes', err);
        setAlbumsError('No se pudieron cargar los álbumes. Por favor, inténtalo nuevamente.');
      } finally {
        setLoadingAlbums(false); // Desactivar el estado de carga
      }
    };

    fetchAlbums();

    // Cleanup: Restablecer estados al cambiar de página o desmontar el componente
    return () => {
        setAlbums([]); // Limpiar los álbumes cuando el componente se desmonte
        setAlbumsError(null); // Limpiar el error
      };
  }, [tag]); // El efecto se ejecuta cada vez que cambia el 'tag'

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!tag) {
        console.error('No se ha proporcionado un tag de usuario');
        setCommunitiesError('Tag de usuario no encontrado');
        setLoadingCommunities(false);
        return;
      }

      const encodedUserTag = encodeURIComponent(tag); // Codificar el tag para la URL

      try {
        setLoadingCommunities(true); // Iniciar la carga de las comunidades
        setCommunitiesError(null); // Limpiar cualquier error previo

        // Hacer la petición GET a la API con el tag codificado
        console.log(encodedUserTag);
        const response = await api.get(`/comunidad/usuario/${encodedUserTag}`);
        console.log('Comunidades obtenidas:', response.data);
        setCommunities(response.data); // Guardar las comunidades en el estado
      } catch (err) {
        console.error('Error al obtener las comunidades', err);
        setCommunitiesError('No se pudieron cargar las comunidades. Por favor, inténtalo nuevamente.');
      } finally {
        setLoadingCommunities(false); // Desactivar el estado de carga
      }
    };

    fetchCommunities();

    // Cleanup: Restablecer estados al cambiar de página o desmontar el componente
    return () => {
        setCommunities([]); // Limpiar las comunidades cuando el componente se desmonte
        setCommunitiesError(null); // Limpiar el error
      };

  }, [tag]); // El efecto se ejecuta cada vez que cambia el 'tag'

  // Renderiza los estados de carga y error
  if (loading || loadingAlbums || loadingCommunities) {
    return <IonContent><div>Cargando...</div></IonContent>; // Muestra un mensaje de carga
  }

  if (error ) {
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
                    {/* Si los álbumes están cargando, mostrar el mensaje de carga */}
                    {loadingAlbums ? (
                        <div className="loading-message">Cargando álbumes...</div>
                    ) : (
                        // Si hay un error al cargar los álbumes, mostrar el mensaje de error
                        albumsError ? (
                        <div className="error-message">No hay álbumes disponibles</div>
                        ) : (
                        // Si no hay error, mostrar los álbumes
                        albums.length > 0 ? (
                            albums.map((album, index) => (
                            <AlbumCard
                                key={index}
                                image={album.coverart} // Usamos coverart para la imagen
                                title={album.album_titulo} // Usamos album_titulo para el título
                                route={`/reproductor/${album.album_id}/${album.primera_cancion_id}`} // Usamos album_id para la ruta
                            />
                            ))
                        ) : (
                            // Si no hay álbumes disponibles
                            <h2>No hay álbumes disponibles.</h2>
                        )
                        )
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

<IonContent className="scrollable">
  <div className="community-container">
    {/* Si las comunidades están cargando, mostrar el mensaje de carga */}
    {loadingCommunities ? (
      <div className="loading-message">Cargando comunidades...</div>
    ) : (
      // Si hay un error al cargar las comunidades, mostrar el mensaje de error
      communitiesError ? (
        <div className="error-message">No hay comunidades disponibles</div>
      ) : (
        // Si no hay error, mostrar las comunidades
        communities.length > 0 ? (
          communities.map((community, index) => (
            <CommunityCard
              key={index}
              topImage={community.avatar} // Usamos background para la imagen superior
              image={community.background} // Usamos avatar para la imagen
              title={community.nombre} // Usamos nombre para el título
              route={`/comunidad/${community.id}`} // Ruta dinámica basada en el ID
            />
          ))
        ) : (
          // Si no hay comunidades disponibles
          <h2>No hay comunidades disponibles.</h2>
        )
      )
    )}
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
  <div className="perfil" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <img className="foto-perfil" src={profileImage} />
    <div className="info">
      <div className="text-box">
        <h1>{username}</h1>
      </div>
      <div className="text-box">
        <h2>{tag}</h2>
      </div>
      <div className="text-box">
        <p>{headerText}</p>
      </div>
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