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

  // Lógica para aleatorizar y limitar los álbumes
  useEffect(() => {
    if (albums.length > 0) {
      const shuffled = shuffleArray(albums); // Aleatorizar los álbumes
      const limited = shuffled.slice(0, 6); // Limitar a 6 álbumes
      setLimitedAlbums(limited); // Actualizar el estado con los álbumes limitados
    }
  }, [albums]); // Este efecto se ejecuta cada vez que cambia 'albums'

  // Muestra un mensaje de carga si está en proceso
  if (loading) {
    return <IonContent><div>Cargando álbumes...</div></IonContent>;
  }

  // Muestra un mensaje de error si ocurre un problema
  if (error) {
    return <IonContent><div>{error}</div></IonContent>;
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
                <AlbumCard key={index} image={album.coverart} title={album.album_titulo} subtitle={album.artista_nombre} />
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
            <UserCard image={"https://f4.bcbits.com/img/0033779152_10.jpg"} title={"[minimo]"} subtitle={"@minimo"} route='/perfil' />
            <UserCard image={"https://f4.bcbits.com/img/0011554563_10.jpg"} title={"b e g o t t e n 自杀"} subtitle={"@begotten"} />
            <UserCard image={"https://f4.bcbits.com/img/0025284024_10.jpg"} title={"아버지"} subtitle={"@father2006"} />
          </div>

          {/*Seccion Comunidades*/}
          <div className='TabContentContainer'>
            <h4>Comunidades Populares</h4>
          </div>
          <div className='community-container'>
            <CommunityCard 
              topImage={"https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs="} 
              image="https://balloonhq.com/wp-content/uploads/2024/01/Balloon_HQ_Resize_1920x1080_where_to_get_balloons_filled_with_helium.png"
              title={"Los payasos de micro"}
              route='/comunidad'
            />
            <CommunityCard 
              topImage={"https://i.scdn.co/image/ab6775700000ee851c90ca347394ad0ce0b68046"} 
              image={"https://scontent-scl2-1.xx.fbcdn.net/v/t39.30808-6/369315461_880463900260778_5464328731750021069_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Qb-5wmOl4ccQ7kNvgFc21wu&_nc_zt=23&_nc_ht=scontent-scl2-1.xx&_nc_gid=A2S41O7gJoSXLIbEiblwoVG&oh=00_AYDYrWBk0JBb3KcDwvtGHnstnSCxzAKxusdpV0-ldxJ0MA&oe=671F1E86"} 
              title={"MetalHead Community"}
            />
            <CommunityCard 
              topImage={"https://m.media-amazon.com/images/I/51qId39VZrL.jpg"} 
              image={"https://attwellfarmpark.co.uk/storage/media/56/conversions/JbZrzKSSO6VFis6Z6vIhI0V691o8m2asMg13KuJm-card@1x.jpg"} 
              title={"Ducks"}
            />
          </div>



        </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Home;
