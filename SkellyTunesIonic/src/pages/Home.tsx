//Import de Elementos IONIC/REACT
import { IonContent, IonPage,} from '@ionic/react';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {AlbumCard, CardList, DynamicCard, UserCard} from '../components/Cards';
import {BotonGeneral} from '../components/Botones'; 

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
{/*Reordenado de datos*/}
const shuffleArray = (array: Album[]): Album[] => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
};

//PAGINA HOME
const Home: React.FC = () => {
  const shuffledAlbums = shuffleArray([...albumsData]);  {/*Aleatorizar albums*/}
  const limitedAlbums = shuffledAlbums.slice(0, 6); {/*Sacar 4 Albums*/}

  const items = [
    { id: 1, label: 'Item 1', imageUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: 2, label: 'Item 2', imageUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: 3, label: 'Item 3', imageUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: 4, label: 'Item 4', imageUrl: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
  ];

  return (
    <IonPage>

      {/*Carga de Interfaz Skelly(Sidebar + Navbar)*/}
      <InterfazGeneral>

        {/*Cuerpo Pagina*/}
        <IonContent className="scrollable">
        <div className="CardsContainer">
          {limitedAlbums.length > 0 ? (
          limitedAlbums.map((album, index) => (
            <AlbumCard key={index} image={album.image} title={album.title} subtitle={album.artist} />
          ))
          ) : (
              <h2>No hay álbumes disponibles.</h2>
              )}
        </div>
                <div className='playlist-card-container'>
                <DynamicCard title="Nier OST" subtitle="Creado por: RubixLander" content="A" image="https://cossky.com/cdn/shop/files/nier_-automata-game-emil-cosplay-latex-masks-halloween-party-costume-props-6_800x.jpg?v=1715844867"/>
                <DynamicCard title="Lofi mix" subtitle="Creado por: RubixLander" content="" image="https://i1.sndcdn.com/artworks-8CkwZ3ukd9P5-0-t500x500.jpg"/>
                <DynamicCard title="Nier OST" subtitle="Creado por: RubixLander" content="" image="https://cossky.com/cdn/shop/files/nier_-automata-game-emil-cosplay-latex-masks-halloween-party-costume-props-6_800x.jpg?v=1715844867"/>
                </div>

                <CardList items={items} />

                <div className="CardsContainer">
                <UserCard image={"https://f4.bcbits.com/img/0033779152_10.jpg"} title={"[minimo]"} subtitle={"@minimo"} />
                <UserCard image={"https://f4.bcbits.com/img/0011554563_10.jpg"} title={"b e g o t t e n 自杀"} subtitle={"@begotten"} />
                <UserCard image={"https://f4.bcbits.com/img/0025284024_10.jpg"} title={"아버지"} subtitle={"@father2006"} />
                </div>


            </IonContent>

      </InterfazGeneral>

    </IonPage>
  );
};



export default Home;