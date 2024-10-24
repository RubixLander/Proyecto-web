//Import de Elementos IONIC/REACT
import { IonContent, IonPage} from '@ionic/react';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {AlbumCard,  PlaylistCard, UserCard, CommunityCard} from '../components/Cards';

//Import de datos
import albumsData from '../data/albums.json';

//Import de CSS
import './Home.css';
import '../theme/base.css';

interface Album {
  image: string;
  title: string;
  artist: string;
}

//Logica Aleatorización
const shuffleArray = (array: Album[]): Album[] => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
};

// Comienzo Pagina Home
const Home: React.FC = () => {
  const shuffledAlbums = shuffleArray([...albumsData]);
  const limitedAlbums = shuffledAlbums.slice(0, 6);



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
                <AlbumCard key={index} image={album.image} title={album.title} subtitle={album.artist} />
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
