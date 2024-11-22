import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { InterfazGeneral } from '../components/Interfaces';
import { MainPlayerCard, AlbumCard } from '../components/Cards';
import { SongList } from '../components/Lists';
import { arrowUpCircle } from 'ionicons/icons';
import { LikeDislikeButtons } from '../components/Botones';
import Chat from '../components/Chat'; // Importa el componente Chat
import './Reproductor.css';

import { useParams } from 'react-router';

// Puentes
import api from '../api/api';

interface AlbumData {
  coverart: string;
  album_titulo: string;
  artista_nombre: string;
  artista_tag: string;
  artista_avatar: string; // Añadido para incluir el avatar del artista
}

interface Song {
  cancion_id: string;
  track: number;
  cancion_titulo: string;
  duracion: string;
}

interface RouteParams {
  albumId: string; // El nombre debe coincidir con el definido en las rutas
  songId: string; // ID de la canción
}

const Reproductor: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { albumId } = useParams<RouteParams>();
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [canciones, setCanciones] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null); // Nueva variable para la canción actual

  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!albumId) {
        setError('ID de álbum no encontrado');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/album/datosalbum/${albumId}`);
        setAlbumData(response.data);
      } catch (err) {
        setError('Error al cargar los datos del álbum.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  useEffect(() => {
    const fetchCanciones = async () => {
      try {
        const response = await api.get(`/cancion/obtenerCanciones/${albumId}`);
        const cancionesData = response.data.canciones;
        setCanciones(cancionesData);

        // Establecer la primera canción como la canción actual
        if (cancionesData.length > 0) {
          const primeraCancion = cancionesData.find(song => song.track === 1); // Busca la canción con track = 1
          setCurrentSong(primeraCancion || cancionesData[0]); // Si no hay track 1, toma la primera canción
        }
      } catch (err) {
        setError('Error al obtener canciones');
      } finally {
        setLoading(false);
      }
    };

    fetchCanciones();
  }, [albumId]);

  let currentAudio: HTMLAudioElement | null = null;

  const handleSongClick = async (song: Song) => {
    try {
      if (currentAudio) {
        currentAudio.pause(); // Detener cualquier reproducción en curso
        currentAudio = null; // Reiniciar
      }
  
      const response = await api.get(`/cancion/reproducirCancion/${song.cancion_id}`, {
        responseType: 'blob',
      });
  
      const audioUrl = URL.createObjectURL(response.data);
      currentAudio = new Audio(audioUrl); // Asignar el nuevo audio
      currentAudio.play();
  
      console.log(`Reproduciendo: ${song.cancion_titulo}`);
    } catch (error) {
      console.error('Error al reproducir la canción:', error);
    }
  };
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Comprobar el tamaño al montar
    window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener al desmontar
    };
  }, []);

  useEffect(() => {
    return () => {
      // Limpiar datos cuando el componente se desmonte
      if (currentAudio) {
        currentAudio.pause(); // Detener cualquier reproducción
        currentAudio = null; // Limpiar el objeto de audio
      }
      setCurrentSong(null); // Limpiar la canción actual
      setCanciones([]); // Limpiar la lista de canciones
    };
  }, []);

  return (
    <IonPage>
      <InterfazGeneral>
        <IonContent className="ion-padding">
          <div className='player-container'>
            <MainPlayerCard 
              image={albumData?.coverart}
              title={currentSong?.cancion_titulo || 'Título desconocido'} // Muestra el título de la canción actual
              subtitle={albumData?.album_titulo}
            />
            <div>
              {isSmallScreen && <LikeDislikeButtons />} 
              <SongList 
                album={albumData?.album_titulo || 'Álbum desconocido'}
                songs={canciones}
                onSongClick={handleSongClick} // Actualiza la canción actual al hacer clic
              />
            </div>
          </div>

          <div className="user-info-container">
            <div className="user-info">
              <img
                src={albumData?.artista_avatar}
                alt="Avatar del usuario"
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">{albumData?.artista_nombre}</span>
                <span className="user-tag">{albumData?.artista_tag}</span>
              </div>
              <IonButton size='small' color="dark" className="follow-button margin-top" fill="solid">Seguir</IonButton>

            </div>
            {!isSmallScreen && <LikeDislikeButtons />}
          </div>

          <div className="chat-album-container">
            <div className="chat">
              <Chat />
            </div>
            <div className="album">
              <h3>Otras personas también escucharon:</h3>
              <AlbumCard 
                image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} 
                title={"Cul de Sac"} 
                subtitle={"[minimo]"} 
                icon={arrowUpCircle} 
              />
            </div>
          </div>

        </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Reproductor;
