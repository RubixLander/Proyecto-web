//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react'
import { IonContent, IonPage} from '@ionic/react';
import { useParams } from 'react-router-dom'; // Importa useParams

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {AlbumCard,  PlaylistCard, UserCard, CommunityCard} from '../components/Cards';

//Import de CSS
import './busqueda.css';

//Puentes
import api from '../api/api';

interface Album {
  id: number;
  coverart: string;
  album_titulo: string;
  año: number;
  artista_nombre: string;
}

interface Artista {
    tag: string;
    nombre: string;
    avatar: string;
  }

// Comienzo Pagina 
const Busqueda: React.FC = () => {
    const { searchQuery } = useParams<{ searchQuery: string }>(); // Obtén el parámetro de la URL
    const [albums, setAlbums] = useState<Album[]>([]); // Estado para los álbumes originales

    const [loading, setLoading] = useState<boolean>(true); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error
  
    // Estado para los artistas, con avatar
    const [artistas, setArtistas] = useState<Artista[]>([]);

    const [loadingArtistas, setLoadingArtistas] = useState<boolean>(true);
    const [errorArtistas, setErrorArtistas] = useState<string | null>(null);


useEffect(() => {
  // Si no hay término de búsqueda, no hacer la búsqueda
  if (searchQuery === '') return;

  setLoading(true); // Activar el estado de carga
  setError(null); // Limpiar el error al iniciar una nueva búsqueda

  const fetchAlbums = async () => {
    try {
      // Petición GET a la API, pasando el término de búsqueda como parámetro
      const response = await api.get('/buscar/albumes', {
        params: { busqueda: searchQuery },
      });
      setAlbums(response.data); // Guardar los resultados de la búsqueda
    } catch (err) {
      console.error('Error al obtener los álbumes', err);
      setError('No se pudieron cargar los álbumes');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  fetchAlbums();

  // Cleanup: Limpiar los datos cuando el componente se desmonte o cuando cambie el término de búsqueda
  return () => {
    setAlbums([]);    // Limpia el estado de álbumes
    setLoading(false); // Restablece el estado de carga
    setError(null);    // Limpia el error
  };

}, [searchQuery]); // Ejecutar el efecto solo cuando `searchQuery` cambie

  // Efecto para obtener los artistas basados en la búsqueda
  useEffect(() => {
    // Si no hay término de búsqueda, no hacer la búsqueda
    if (searchQuery === '') return;
  
    setLoadingArtistas(true); // Activar el estado de carga
    setErrorArtistas(null);   // Limpiar el error al iniciar una nueva búsqueda
  
    const fetchArtistas = async () => {
      try {
        // Petición GET a la API, pasando el término de búsqueda como parámetro
        const response = await api.get<Artista[]>('/buscar/artistas', {
          params: { busqueda: searchQuery },
        });
        setArtistas(response.data); // Guardar los resultados de la búsqueda
      } catch (err) {
        console.error('Error al obtener los artistas', err);
        setErrorArtistas('No se pudieron cargar los artistas');
      } finally {
        setLoadingArtistas(false); // Desactivar el estado de carga
      }
    };
  
    fetchArtistas();
  
    // Cleanup: Limpiar los datos cuando el componente se desmonte o cuando cambie el término de búsqueda
    return () => {
      setArtistas([]);   // Limpia el estado de artistas
      setLoadingArtistas(false); // Restablece el estado de carga de artistas
      setErrorArtistas(null);    // Limpia el error de artistas
    };
  
  }, [searchQuery]); // Ejecutar el efecto solo cuando `searchQuery` cambie

  // Muestra mensaje de carga
  if (loading || loadingArtistas) {
    return <IonContent><div>Cargando...</div></IonContent>;
  }


  return (
    <IonPage>
      <InterfazGeneral>

        {/*Comienzo Contenido*/}
        <IonContent className="scrollable">

          {/*Seccion Albumes*/}
          <div className='TabContentContainer'>
          
            <h2>Resultados</h2>
          </div>
          <div className='TabContentContainer'>
          
            <h4>Albums</h4>
          </div>

          <div className="CardsContainer">
  {/* Mostrar los resultados de la búsqueda */}
  {albums.length > 0 ? (
    albums.map((album, index) => (
      <AlbumCard
        key={index}
        image={album.coverart} // Imagen del álbum
        title={album.album_titulo} // Título del álbum
        subtitle={album.artista_nombre} // Nombre del artista
        route={`/reproductor/${album.id}`} // Ruta para ir al reproductor
      />
    ))
  ) : (
    // Si no hay resultados
    <div>No se encontraron álbumes.</div>
  )}
</div>



          {/*Seccion Artistas*/}
          <div className='TabContentContainer'>
            <h4>Usuarios</h4>
          </div>
          <div className="CardsContainer">

          <div>

          {artistas.length > 0 ? (
            artistas.map((artista) => (
              <UserCard
                key={artista.tag}
                image={artista.avatar}
                title={artista.nombre}
                subtitle={artista.tag}
                route={`/perfil/${artista.tag}`} // Ruta dinámica hacia el perfil del artista
              />
            ))
          ) : (
            <div>No se encontraron usuarios</div> // Mensaje en caso de no encontrar artistas
          )}
        </div>

          </div>





        </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Busqueda;
