//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react'
import { IonContent, IonPage} from '@ionic/react';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {AlbumCard,  PlaylistCard, UserCard, CommunityCard} from '../components/Cards';

//Import de CSS
import './Home.css';
import '../theme/base.css';

//Puentes
import api from '../api/api';

interface Album {
  id: number;
  coverart: string;
  album_titulo: string;
  año: number;
  artista_nombre: string;
  primera_cancion_id: number;
}

interface Artista {
  tag: string;
  nombre: string;
  avatar: string;  // Nuevo campo para el avatar
}

interface Comunidad {
  id: number;
  nombre: string;
  background: string;
  avatar: String
}

// Lógica de aleatorización
const shuffleArray = (array: Album[]): Album[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Comienzo Pagina Home
const Home: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]); // Estado para los álbumes originales
  const [limitedAlbums, setLimitedAlbums] = useState<Album[]>([]); // Álbumes aleatorizados y limitados
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Estado para los artistas, con avatar
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [limitedArtistas, setLimitedArtistas] = useState<Artista[]>([]);  // Estado para los artistas limitados
  const [loadingArtistas, setLoadingArtistas] = useState<boolean>(true);
  const [errorArtistas, setErrorArtistas] = useState<string | null>(null);

    // Estado para almacenar las comunidades
    const [comunidades, setComunidades] = useState<Comunidad[]>([]);
    const [limitedComunidades, setLimitedComunidades] = useState<Comunidad[]>([]);
    const [loadingComunidades, setLoadingComunidades] = useState(true);
    const [errorComunidades, setErrorComunidades] = useState<string | null>(null);

  // Efecto para obtener los álbumes al cargar el componente
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get<Album[]>('/album/albums'); // Petición GET a la API
        setAlbums(response.data); // Guardar los álbumes en el estado
      } catch (err) {
        console.error('Error al obtener los álbumes', err);
        setError('No se pudieron cargar los álbumes');
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchAlbums();
  }, []);

  // Efecto para obtener los artistas, ahora con avatar
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await api.get<Artista[]>('/artistas/artistas'); // Llamada a la nueva API de artistas
        setArtistas(response.data);
      } catch (err) {
        console.error('Error al obtener los artistas', err);
        setErrorArtistas('No se pudieron cargar los artistas');
      } finally {
        setLoadingArtistas(false);
      }
    };

    fetchArtistas();
  }, []);

  // Efecto para obtener las comunidades
  useEffect(() => {
    const fetchComunidades = async () => {
      try {
        const response = await api.get<Comunidad[]>('/comunidad/comunidades'); // Llamada a la API de comunidades
        setComunidades(response.data);
      } catch (err) {
        console.error('Error al obtener las comunidades', err);
        setErrorComunidades('No se pudieron cargar las comunidades');
      } finally {
        setLoadingComunidades(false);
      }
    };

    fetchComunidades();
  }, []);



  // Lógica para aleatorizar y limitar los álbumes
  useEffect(() => {
    if (albums.length > 0) {
      const shuffled = shuffleArray(albums); // Aleatorizar los álbumes
      const limited = shuffled.slice(0, 6); // Limitar a 6 álbumes
      setLimitedAlbums(limited); // Actualizar el estado con los álbumes limitados
    }
  }, [albums]); // Este efecto se ejecuta cada vez que cambia 'albums'

  // Lógica para aleatorizar y limitar los artistas
  useEffect(() => {
    if (artistas.length > 0) {
      const shuffled = shuffleArray(artistas);
      const limited = shuffled.slice(0, 3); // Limitar a 3 artistas
      setLimitedArtistas(limited);
    }
  }, [artistas]);

  // Lógica para aleatorizar y limitar las comunidades
  useEffect(() => {
    if (comunidades.length > 0) {
      const shuffled = shuffleArray(comunidades); // Aleatorizar las comunidades
      const limited = shuffled.slice(0, 3); // Limitar a 3 comunidades
      setLimitedComunidades(limited); // Actualizar el estado con las comunidades limitadas
    }
  }, [comunidades]);

  // Muestra mensaje de carga
  if (loading || loadingArtistas || loadingComunidades) {
    return <IonContent><div>Cargando...</div></IonContent>;
  }

  // Muestra mensaje de error
  if (error || errorArtistas || errorComunidades) {
    return <IonContent><div>{error || errorArtistas || errorComunidades}</div></IonContent>;
  }

  return (
    <IonPage>
      <InterfazGeneral>

        {/*Comienzo Contenido*/}
        <IonContent className="scrollable">

          {/*Seccion Albumes*/}
          <div className='TabContentContainer'>
            <h4>Álbumes en Tendencia</h4>
          </div>

          <div className="CardsContainer">
            {limitedAlbums.length > 0 ? (
              limitedAlbums.map((album, index) => (
                <AlbumCard key={index} image={album.coverart} title={album.album_titulo} subtitle={album.artista_nombre} route={`/reproductor/${album.id}/${album.primera_cancion_id}`} />
              ))
            ) : (
              <h2>No hay álbumes disponibles.</h2>
            )}
          </div>

          {/*Seccion Listas*/}      
          <div className='TabContentContainer'>
            <h4>Listas de la semana</h4>
          </div>
          <div className='playlist-card-container'>
            <PlaylistCard
              title="Nier OST" 
              subtitle="Creado por: t e l e p a t h" 
              content="The entire Nier series OST, in one place!" 
              image="https://cossky.com/cdn/shop/files/nier_-automata-game-emil-cosplay-latex-masks-halloween-party-costume-props-6_800x.jpg?v=1715844867"
            />
            <PlaylistCard
              title="Lofi mix" 
              subtitle="Creado por: lofiman" 
              content="A nice mix to study/relax to" 
              image="https://i1.sndcdn.com/artworks-8CkwZ3ukd9P5-0-t500x500.jpg"
            />
            <PlaylistCard
              title="Meme collection" 
              subtitle="Creado por: RubixLander" 
              content="Music from various memes" 
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYkZu9T9U6sDTl9vaTUJoAJ1WIx6igyZIfyhyEETbCEP4gsm58RbjFtE4RzFjSTDalO8&usqp=CAU"
            />
          </div>



          {/*Seccion Artistas*/}
          <div className='TabContentContainer'>
            <h4>Artistas Destacados</h4>
          </div>
          <div className="CardsContainer">
          {limitedArtistas.map((artista) => (
              <UserCard
                key={artista.tag}
                image={artista.avatar}
                title={artista.nombre}
                subtitle={`${artista.tag}`}
                route={`/perfil/${artista.tag}`}
              />
          ))}

          </div>

          {/*Seccion Comunidades*/}
          <div className='TabContentContainer'>
            <h4>Comunidades Populares</h4>
          </div>
          <div className="community-container">
          {limitedComunidades.map((comunidad) => (
            <CommunityCard
              key={comunidad.id}
              topImage={comunidad.avatar} // Imagen de fondo
              image={comunidad.background} // Imagen de avatar
              title={comunidad.nombre} // Nombre de la comunidad
              route={`/comunidad/${comunidad.id}`} // Ruta dinámica basada en el ID
            />
          ))}
        </div>



        </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Home;
