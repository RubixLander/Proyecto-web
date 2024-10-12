//Import de Elementos IONIC/REACT
import { IonContent, IonPage,} from '@ionic/react';

//Import de Componentes
import Skellybar from '../components/InterfazNavegacion';
import Cards from '../components/Cards';
import {BotonGeneral} from '../components/Botones'; 

//Import de CSS
import './Home.css';

//PAGINA HOME
const Home: React.FC = () => {
  return (
    <IonPage>

      {/*Carga de Interfaz Skelly(Sidebar + Navbar)*/}
      <Skellybar>

        {/*Cuerpo Pagina*/}
        <IonContent fullscreen>
          <div className = "CardsContainer">
            <Cards 
              image="https://i.redd.it/xgwxtidr2vda1.jpg"
              title="Crazy dave exaple"
              subtitle="Webi Wabo"
            /> 

            <Cards 
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUl2vnoQZX1wndoGoo0UFv2cSqLnnSyBgoA&s"
              title="Hombre prepucio"
              subtitle="Intentaron"
              content='circuncidarme'
            /> 
            <Cards
              image="https://okdiario.com/img/2019/07/07/pato.jpg"
              title="Cuak"
              subtitle="Life goes"
            />

            <Cards
              image="https://okdiario.com/img/2019/07/07/pato.jpg"
              title="Cuak"
              subtitle="Life goes"
            />

            <Cards
              image="https://okdiario.com/img/2019/07/07/pato.jpg"
              title="Cuak"
              subtitle="Life goes"
            />
          </div>

        </IonContent>

      </Skellybar>

    </IonPage>
  );
};

export default Home;