//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonIcon } from '@ionic/react';
import { playCircle, library, people, list , radio, albums, calendar, earth, logoSoundcloud, logoInstagram} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {MediaCard} from '../components/Cards';

//Import de datos
import albumsData from '../data/albums.json';

//Import de CSS
import './perfil.css';


import { useAuth } from '../contexts/autentificacion';




const Perfil: React.FC = () => {
    const {isAuthenticated} = useAuth();

    /*CONTENIDO DE PAGINAS DE PERFIL*/
    const tabs = [
        {
            /*TAB: Albums*/
            id: 'musica', title: 'Música', icon: playCircle,
            content: 

            /*Contenido*/
            <IonContent className="scrollable">
                <div className="CardsContainer">
                    {albumsData.filter(album => album.tag === "@minimo").length > 0 ? (
                        albumsData.filter(album => album.tag === "@minimo").map((album, index) => (
                            <MediaCard key={index} image={album.image} title={album.title} />
                        ))
                    ) : (
                        <h2>No hay álbumes disponibles.</h2>
                    )}
                </div>
            </IonContent>
        },


        {
             /*TAB: Comunidades*/
             id: 'list', title: 'Listas', icon: list,
             content: 
 
             /*Contenido*/
             <IonContent className="scrollable">
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
             /*TAB: Comunidades*/
            id: 'comunidades', title: 'Comunidades', icon: people,
            content: 

            /*Contenido*/
            <h1>a</h1>
        },


        {
            /*TAB: Acerce de*/
            id: 'about',title: 'Acerca de',icon: library,
            content:
            
            /*Contenido*/
            <IonContent className='scrollable'>
                <div className='about-container'>

                <div className="about-info">
                    {/* Información */}
                    <h2>Información</h2>
                    <p>Inspired by the Low End Theory beat scene in Los Angeles like Flying Lotus, Mndsgn, Dibia$e, STLNDMS and more. Chilean local beatmakers like Flakodiablo, Bagre and more.</p>

                    {/* Detalles */}
                    <h2>Detalles</h2>
                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={radio} slot="start" />
                        <IonLabel>10 oyentes</IonLabel>
                    </div>

                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={albums} slot="start" />
                        <IonLabel>3 Álbumes</IonLabel>
                    </div>

                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={calendar} slot="start" />
                        <IonLabel>Se unió el 12.01.2021</IonLabel>
                    </div>

                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={earth} slot="start" />
                        <IonLabel>Chile</IonLabel>
                    </div>

                    {/* Enlaces */}
                    <h2>Enlaces</h2>
                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={logoSoundcloud} slot="start" />
                        <IonLabel>Soundcloud</IonLabel>
                    </div>

                    <div className="detail-item">
                        <IonIcon aria-hidden="true" icon={logoInstagram} slot="start" />
                        <IonLabel>Instagram</IonLabel>
                    </div>


                </div>





                </div>
            </IonContent>
        },

    ];
    return (

        /*ESTRUCTURA DE PAGINA*/
        <IonPage>
            {/*Carga de Interfaz Skelly(Sidebar + Navbar)*/}
            <InterfazGeneral>
                <IonContent>

                {/*CONTENIDO PAGINA*/}
                    {/*CABECERA DE PERFIL*/}
                    <IonHeader>
                        <div className="perfil">
                                <img className = "foto-perfil" src="https://f4.bcbits.com/img/0033779152_21.jpg"/>
                                <div className="info">
                                    <h1>[minimo]</h1>
                                    <h2>@minimo</h2>
                                    <p>Lo-Fi, Psychodelic Beats from my intoxicated mind.</p>
                                </div>

                                {!isAuthenticated && (
                                <div className="seguir-btn">
                                    <BotonGeneral text='Seguir' color='dark' size='small'/>
                                </div>
                                )}

                        </div>
                    </IonHeader>

                    {/*CUERPO DE PERFIL*/}
                    <IonContent>
                        <TabsNavegacion tabs={tabs} /> {/*CONTENIDO TABS DEFINIDOS ARRIBA*/}
                    </IonContent>
                    </IonContent>

            </InterfazGeneral>
        </IonPage>
    );
};

export default Perfil;