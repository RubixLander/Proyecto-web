import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon, IonList, IonLabel,IonItem } from '@ionic/react';
import { albums, library, time, personAdd, thumbsUp, list, bookmark, arrowUpCircle} from 'ionicons/icons';
import {InterfazGeneral} from '../components/Interfaces';
import './biblioteca.css';
import { AlbumCard, DynamicCard, UserCard } from '../components/Cards';
import TabsNavegacion from '../components/Tabs'

const Biblioteca: React.FC = () => {
    /*CONTENIDO DE PAGINAS DE PERFIL*/
    const tabs = [
        {
            /*TAB: Albums*/
            id: 'albums', title: 'Álbumes', icon: albums,
            content: 

            /*Contenido*/
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
        },

        {
             /*TAB: Comunidades*/
            id: 'list', title: 'Listas', icon: list,
            content: 

            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                <h4>Observa las listas que has guardado y creado!</h4>
                </div>
                <div className="playlist-card-container">
                <DynamicCard title="Meme collection" subtitle="Creado por: RubixLander" content="Music from various memes" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYkZu9T9U6sDTl9vaTUJoAJ1WIx6igyZIfyhyEETbCEP4gsm58RbjFtE4RzFjSTDalO8&usqp=CAU"/>
                <DynamicCard title="cosas" subtitle="Creado por: [minimo]" content="cosas xd" image="https://i1.sndcdn.com/artworks-2M8nUwmmzUULy03L-NOmCVg-t500x500.jpg"/>
                </div>

            </IonContent>

        },

        {
            /*TAB: Acerce de*/
            id: 'like',title: 'Me gusta',icon: thumbsUp,
            content:
            
            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                <h4>Ve que canciones te gustan!</h4>
                </div>
                <div className="CardsContainer">

                <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                </div>

            </IonContent>
        },

        {
            /*TAB: Acerce de*/
            id: 'users',title: 'Seguidos',icon: personAdd,
            content:
            
            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                <h4>Ve a las personas que sigues!</h4>
                </div>
                <div className="CardsContainer">
                    <UserCard image={"https://f4.bcbits.com/img/0009898048_10.jpg"} title={"Jack Stauber"} subtitle={"@jackstauber"} />
                    <UserCard image={"https://static1.personality-database.com/profile_images/b32c45f4aa9f41caba35d3c0f1687688.png"} title={"RubixLander"} subtitle={"@rubixlander"} />

                </div>

            </IonContent>
        },

        {
            /*TAB: Acerce de*/
            id: 'history',title: 'Historial',icon: time,
            content:
            
            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                <h4>Observa que has estado escuchando recientemente!</h4>
                </div>
                <div className="CardsContainer">
                
                <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                </div>

            </IonContent>
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
                {/* Aquí puedes agregar el contenido de tu página */}
                <TabsNavegacion tabs={tabs} /> {/*CONTENIDO TABS DEFINIDOS ARRIBA*/}


            </IonContent>
            </InterfazGeneral>
        </IonPage>
    );
};

export default Biblioteca;