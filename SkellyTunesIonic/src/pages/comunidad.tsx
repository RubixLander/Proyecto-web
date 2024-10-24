//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage,  IonLabel,  IonIcon } from '@ionic/react';
import { chatbubbles,  people, star , calendar, information} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {AlbumCard, UserCard, DiscussionCard} from '../components/Cards';

//Import de CSS
import './comunidad.css';


const Comunidad: React.FC = () => {
    /* CONTENIDO DE PAGINAS DE PERFIL */
    const tabs = [
      {
        /* TAB: Discusiones */
        id: 'discussions',
        title: 'Discusiones',
        icon: chatbubbles,
        content: (
          <IonContent className="scrollable">
            <div className='discussion-container'>
              <DiscussionCard 
                inCommunity={true}  
                communityName="@rubixlander"
                communityImage="https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"
                title="Creen que salga el OST de SilkSong antes que el juego? xd"
                subtitle="22 de Octubre"
                content="Lo del titulo"
              />
              <DiscussionCard 
                inCommunity={true}   
                communityName="@telepath0s"
                communityImage="https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca"
                title="¿Alguien sabe las samples que uso [minimo] en su ultimo EP?"
                subtitle="7 de septiembre"
                content="Especificamente los de LOST IN SPACE PRIMATE "
              />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Destacados */
        id: 'featured',
        title: 'Destacados',
        icon: star,
        content: (
          <IonContent className="scrollable">
            <div className='TabContentContainer'>
              <h4>Destacado por la comunidad!</h4>
            </div>
            <div className="CardsContainer">
              <AlbumCard image={"https://cdn.wikimg.net/en/hkwiki/images/thumb/e/e3/Mainpromo9.jpg/300px-Mainpromo9.jpg"} title={"Hollow Knight (Original Soundtrack)"} subtitle={"Christopher Larkin"} />
              <AlbumCard image={"https://cdn.wikimg.net/en/hkwiki/images/thumb/c/ca/Gods_Nightmare_cover_art.png/300px-Gods_Nightmare_cover_art.png"} title={"Hollow Knight: Gods and Nightmares"} subtitle={"Christopher Larkin"} />
            </div>
          </IonContent>
        ),
      },
      {
        /* TAB: Miembros */
        id: 'members',
        title: 'Miembros',
        icon: people,
        content: (
          <IonContent className="scrollable">
            <div className='TabContentContainer'>
              <h4>Administrador</h4>
            </div>
            <div className='CardsContainer'>
              <UserCard image={"https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"} title={"RubixLander"} subtitle={"@rubixlander"} />
            </div>
            <div className='TabContentContainer'>
              <h4>Miembros</h4>
            </div>
            <div className='CardsContainer'>
              <UserCard image={"https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca"} title={"t e l e p a t h"} subtitle={"@telepath0s"} />
              <UserCard image={"https://f4.bcbits.com/img/0033779152_10.jpg"} title={"[minimo]"} subtitle={"@minimo"} route='/perfil' />
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
                <p>
                  Bienvenidos al el día del payaso. Este día los payasitos se reúnen para hacer unos chistositos bien grasiositos. 
                  "Oigale, cuente un chiste!" "....ehhhh...." El día del payaso 1 de abril de cualquier año. Todos los payasitos 
                  se reúnen para hacer felices a los niñitos y a los grandecitos también. 
                  "Oye, está el señor payaso, el señor payach-!" .... El día del payaso. Hay muchos payasitos, está el payasito 
                  chistosito, la payasita sin chichita, el payacho cacho HAHAA. 
                  Así que no esperes más, celebra a tu payasito favorito este día, y solo es 1, porque mañana es 2 HAHAAAAA.
                </p>
  
                <h2>Detalles</h2>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={people} slot="start" />
                  <IonLabel>3 miembros</IonLabel>
                </div>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={chatbubbles} slot="start" />
                  <IonLabel>2 Discusiones</IonLabel>
                </div>
                <div className="detail-item">
                  <IonIcon aria-hidden="true" icon={calendar} slot="start" />
                  <IonLabel>Creado el 12.01.2021</IonLabel>
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
        {/* Carga de Interfaz Skelly (Sidebar + Navbar) */}
        <InterfazGeneral>
          <IonContent>
            {/* CABECERA DE PERFIL */}
            <IonHeader>
              <div className="comunidad-cabecera">
                <img className="comunidad-cabecera-foto" src="https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs=" />
                <div className="comunidad-cabecera-info">
                  <h1>Los payasos de micro</h1>
                  <p>Porque la vida es una comedia</p>
                </div>
                <div className="comunidad-cabecera-btn">
                  <BotonGeneral text='Unirse' color='dark' size='small' />
                </div>
              </div>
            </IonHeader>
  
            {/* CUERPO DE PERFIL */}
            <IonContent>
              <TabsNavegacion tabs={tabs} /> {/* CONTENIDO TABS DEFINIDOS ARRIBA */}
            </IonContent>
          </IonContent>
        </InterfazGeneral>
      </IonPage>
    );
  };
  
  export default Comunidad;