//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon} from '@ionic/react';
import { albums, library, time, personAdd, thumbsUp, list, bookmark, arrowUpCircle} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import { AlbumCard, PlaylistCard, UserCard,TrackCard } from '../components/Cards';
import TabsNavegacion from '../components/Tabs'

//Import de CSS
import './biblioteca.css';

const Biblioteca: React.FC = () => {
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
              <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"reflection"} subtitle={"아버지"} icon={bookmark} />
              <AlbumCard image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} title={"Cul de Sac"} subtitle={"[minimo]"} icon={arrowUpCircle} />
              <AlbumCard image={"https://f4.bcbits.com/img/a0164762771_16.jpg"} title={"COSMIC TAPES VOL.1"} subtitle={"[minimo]"} icon={arrowUpCircle} />
              <AlbumCard image={"https://f4.bcbits.com/img/a0206112719_16.jpg"} title={"(Proto​-​Minimo - Separate EP​)​VOL​.​1"} subtitle={"[minimo]"} icon={arrowUpCircle} />
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
              <AlbumCard image="https://f4.bcbits.com/img/a0827190352_16.jpg" title="失​わ​れ​た​時​REGRET" subtitle="death's dynamic shroud.wmv" />
              <AlbumCard image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} title={"Cul de Sac"} subtitle={"[minimo]"} icon={arrowUpCircle} route='/reproductor' />
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