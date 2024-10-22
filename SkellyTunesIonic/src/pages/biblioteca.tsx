import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon, IonList, IonLabel,IonItem } from '@ionic/react';
import { albums, library, time, personAdd, thumbsUp, list, bookmark, arrowUpCircle} from 'ionicons/icons';
import {InterfazGeneral} from '../components/Interfaces';
import './biblioteca.css';
import { MediaCard, DynamicCard } from '../components/Cards';
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
                        <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"reflection"} subtitle={"아버지"} icon={bookmark} />
                        <MediaCard image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} title={"Cul de Sac"} subtitle={"[minimo]"} icon={arrowUpCircle} />
                        <MediaCard image={"https://f4.bcbits.com/img/a0164762771_16.jpg"} title={"COSMIC TAPES VOL.1"} subtitle={"[minimo]"} icon={arrowUpCircle} />
                        <MediaCard image={"https://f4.bcbits.com/img/a0206112719_16.jpg"} title={"(Proto​-​Minimo - Separate EP​)​VOL​.​1"} subtitle={"[minimo]"} icon={arrowUpCircle} />
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
                <h4>Observa tus listas y las listas de otras personas!</h4>
                </div>
                <div className="CardsContainer">
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
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

                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
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
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />

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
                <h4>Observa tu historial de musica escuchada</h4>
                </div>
                <div className="CardsContainer">
                
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                <MediaCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                </div>

            </IonContent>
        },

    ];
    return (
        <IonPage>
            <InterfazGeneral>
            <IonHeader>
                    <IonToolbar className="biblioteca-header">
                        <div className="biblioteca-header-contenido">
                            <IonIcon icon={library} className="biblioteca-header-icono" />
                            <IonTitle className="biblioteca-header-titulo">Biblioteca</IonTitle>
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