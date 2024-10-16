//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { playCircle, library, people } from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {MediaCard} from '../components/Cards';

//Import de datos
import albumsData from '../data/albums.json';

//Import de CSS
import './perfil.css';




const Perfil: React.FC = () => {
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
            <h1>d</h1>
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
                                <div className="seguir-btn">
                                    <BotonGeneral text='Seguir' color='dark' size='small'/>
                                </div>
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