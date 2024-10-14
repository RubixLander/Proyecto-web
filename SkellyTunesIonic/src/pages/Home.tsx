//Import de Elementos IONIC/REACT
import { IonContent, IonPage,} from '@ionic/react';

//Import de Componentes
import Skellybar from '../components/InterfazNavegacion';
import {MediaCard, CardList, DynamicCard} from '../components/Cards';
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
      <Skellybar>

        {/*Cuerpo Pagina*/}
        <IonContent className="scrollable">
        <div className="CardsContainer">
          {limitedAlbums.length > 0 ? (
          limitedAlbums.map((album, index) => (
            <MediaCard key={index} image={album.image} title={album.title} subtitle={album.artist} />
          ))
          ) : (
              <h2>No hay álbumes disponibles.</h2>
              )}
        </div>
                <DynamicCard title="Mi Título Dinámico" subtitle="Mi Subtítulo Dinámico" content="Aquí va el contenido dinámico de la tarjeta." image="https://i.scdn.co/image/ab67616d0000b273d8ff4bc4a6a3f1beefbeb26c"/>

                <CardList items={items} />


            </IonContent>

      </Skellybar>

    </IonPage>
  );
};



export default Home;