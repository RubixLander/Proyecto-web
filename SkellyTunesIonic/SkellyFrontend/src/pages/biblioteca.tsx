//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon} from '@ionic/react';
import { albums, library, time, personAdd, thumbsUp, list, bookmark, arrowUpCircle} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import { AlbumCard, PlaylistCard, UserCard,TrackCard } from '../components/Cards';
import TabsNavegacion from '../components/Tabs'

//Import de CSS
import './biblioteca.css';

//Puentes
import api from '../api/api';

interface Album {
  album_id: number;
  coverart: string;
  album_titulo: string;
  artista_nombre: string;
  artista_tag: string;
}

interface Community {
  id: number;
  nombre: string;
  background: string;
  avatar: string;
}

const Biblioteca: React.FC = () => {

  const [userAlbums, setUserAlbums] = useState<Album[]>([]);

  const [loadingUserAlbums, setLoadingUserAlbums] = useState<boolean>(false); // Estado de carga para álbumes
  const [userAlbumsError, setUserAlbumsError] = useState<string | null>(null); // Estado de error específico para los álbumes

  const [communities, setCommunities] = useState<Community[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState<boolean>(false);
  const [communitiesError, setCommunitiesError] = useState<string | null>(null);

  const tag = localStorage.getItem('userTag'); // Tag del usuario autenticado

  // Efecto para obtener los álbumes al cargar el componente
  useEffect(() => {
    const fetchUserAlbums = async () => {
      if (!tag) {
        console.error('No se ha proporcionado un tag de usuario');
        setUserAlbumsError('Tag de usuario no encontrado');
        setLoadingUserAlbums(false);
        return;
      }

      const encodedUserTag = encodeURIComponent(tag); // Codificar el tag para la URL

      try {
        setLoadingUserAlbums(true); // Iniciar la carga de los álbumes
        setUserAlbumsError(null); // Limpiar cualquier error previo

        // Hacer la petición GET a la API con el tag codificado
        console.log(encodedUserTag);
        const response = await api.get(`/album/albumsUsuario/${encodedUserTag}`);
        console.log('Álbumes obtenidos:', response.data);
        setUserAlbums(response.data.albums); // Guardar los álbumes en el estado
      } catch (err) {
        console.error('Error al obtener los álbumes', err);
        setUserAlbumsError('No se pudieron cargar los álbumes. Por favor, inténtalo nuevamente.');
      } finally {
        setLoadingUserAlbums(false); // Desactivar el estado de carga
      }
    };

    fetchUserAlbums();

    // Cleanup: Restablecer estados al cambiar de página o desmontar el componente
    return () => {
        setUserAlbums([]); // Limpiar los álbumes cuando el componente se desmonte
        setUserAlbumsError(null); // Limpiar el error
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




    /* CONTENIDO DE PAGINAS DE PERFIL */
    const tabs = [
      {
        /* TAB: Albums */
        id: 'albums',
        title: 'Álbumes',
        icon: albums,
        content: (

<IonContent className="scrollable">
<div className='TabContentContainer'>
              <h4>Escucha álbumes que has subido y que has guardado!</h4>
            </div>
  <div className="CardsContainer">
    {/* Si los álbumes están cargando, mostrar el mensaje de carga */}
    {loadingUserAlbums ? (
    <div className="loading-message">Cargando álbumes...</div>
  ) : userAlbumsError ? (
    <div className="error-message"></div>
  ) : Array.isArray(userAlbums) && userAlbums.length > 0 ? ( // Verificar que sea un array
    userAlbums.map((album) => (
      <AlbumCard
        key={album.album_id}
        image={album.coverart}
        title={album.album_titulo}
        route={`/reproductor/${album.album_id}`}
        icon={arrowUpCircle}
      />
    ))
  ) : (
    <h2>No hay álbumes disponibles.</h2>
  )}
</div>
</IonContent>
  




        ),
      },
      {
        /* TAB: Comunidades */
        id: 'list',
        title: 'Listas',
        icon: list,
        content: (
          <IonContent className="scrollable">
            <div className='TabContentContainer'>
              <h4>Observa las listas que has guardado y creado!</h4>
            </div>
            <div className="playlist-card-container">
              <PlaylistCard title="Meme collection" subtitle="Creado por: RubixLander" content="Music from various memes" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYkZu9T9U6sDTl9vaTUJoAJ1WIx6igyZIfyhyEETbCEP4gsm58RbjFtE4RzFjSTDalO8&usqp=CAU" />
              <PlaylistCard title="cosas" subtitle="Creado por: [minimo]" content="cosas xd" image="https://i1.sndcdn.com/artworks-2M8nUwmmzUULy03L-NOmCVg-t500x500.jpg" />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Me gusta */
        id: 'like',
        title: 'Me gusta',
        icon: thumbsUp,
        content: (
          <IonContent className="scrollable">

            <div className='TabContentContainer'>
              <h4>Ve que canciones te gustan!</h4>
            </div>

            <div className="track-card-container">
              <TrackCard
                title="ƤROℳISE ƦINǤ"
                subtitle="失​わ​れ​た​時​REGRET"
                duration='1:00'
                artist="death's dynamic shroud.wmv"
                image="https://f4.bcbits.com/img/a0827190352_16.jpg"
                route='/reproductor'
              />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Seguidos */
        id: 'users',
        title: 'Seguidos',
        icon: personAdd,
        content: (
          <IonContent className="scrollable">

            <div className='TabContentContainer'>
              <h4>Ve a las personas que sigues!</h4>
            </div>

            <div className="CardsContainer">
              <UserCard image={"https://f4.bcbits.com/img/0009898048_10.jpg"} title={"Jack Stauber"} subtitle={"@jackstauber"} />
              <UserCard image={"https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"} title={"RubixLander"} subtitle={"@rubixlander"} />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Historial */
        id: 'history',
        title: 'Historial',
        icon: time,
        content: (
          <IonContent className="scrollable">

            <div className='TabContentContainer'>
              <h4>Observa que has estado escuchando recientemente!</h4>
            </div>

            <div className='TabContentContainer'>
              <h4>Albums</h4>
            </div>

            <div className="CardsContainer">
              <AlbumCard image="https://f4.bcbits.com/img/a0827190352_16.jpg" title="失​わ​れ​た​時​REGRET" subtitle="death's dynamic shroud.wmv" route='/reproductor'/>
              <AlbumCard image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} title={"Cul de Sac"} subtitle={"[minimo]"} icon={arrowUpCircle}  />
            </div>

            <div className='TabContentContainer'>
              <h4>Canciones</h4>
            </div>

            <div className="track-card-container">
              <TrackCard
                title="ƤROℳISE ƦINǤ"
                subtitle="失​わ​れ​た​時​REGRET"
                duration='1:00'
                artist="death's dynamic shroud.wmv"
                image="https://f4.bcbits.com/img/a0827190352_16.jpg"
                route='/reproductor'
              />
              <TrackCard
                title="Cul de Sac"
                subtitle="Cul de Sac"
                duration='1:00'
                artist='[minimo]'
                image="https://f4.bcbits.com/img/a0972302045_16.jpg"
              />
              <TrackCard
                title="Fenix"
                subtitle="Cul de Sac"
                duration='1:00'
                artist='[minimo]'
                image="https://f4.bcbits.com/img/a0972302045_16.jpg"
              />

            </div>
          </IonContent>
        ),
      },
    ];
  
    return (
      <IonPage>
        <InterfazGeneral>
          <IonHeader>
            <IonToolbar className="custom-header">
              <div className="custom-header-contenido">
                <IonIcon icon={library} className="custom-header-icono" />
                <IonTitle className="custom-header-titulo">Biblioteca</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <TabsNavegacion tabs={tabs} /> {/* CONTENIDO TABS DEFINIDOS ARRIBA */}
          </IonContent>
        </InterfazGeneral>
      </IonPage>
    );
  };
  
  export default Biblioteca;