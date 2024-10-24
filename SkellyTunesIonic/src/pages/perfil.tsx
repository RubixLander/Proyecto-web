//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonIcon } from '@ionic/react';
import { playCircle, library, people, list , radio, albums, calendar, earth, logoSoundcloud, logoInstagram, information} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {AlbumCard, CommunityCard, DynamicCard} from '../components/Cards';

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
                            <AlbumCard key={index} image={album.image} title={album.title} />
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
                <div className="playlist-card-container">
                <DynamicCard title="cosas" subtitle="Creado por: [minimo]" content="cosas xd" image="https://i1.sndcdn.com/artworks-2M8nUwmmzUULy03L-NOmCVg-t500x500.jpg"/>
                </div>
 
             </IonContent>
 
         },

        {
             /*TAB: Comunidades*/
            id: 'comunidades', title: 'Comunidades', icon: people,
            content: 

            /*Contenido*/
            <div className='community-container'>
            <CommunityCard 
            topImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp08RZAoIfJnOtiDVX0C8Bdm3xw6op5aaRlg&s"} 
            image="https://i.redd.it/gb1ccyushjf81.png"
            title={"DeepRockMusic"}/>
                <CommunityCard 
                topImage={"https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs="} 
                image="https://balloonhq.com/wp-content/uploads/2024/01/Balloon_HQ_Resize_1920x1080_where_to_get_balloons_filled_with_helium.png"
                title={"Los payasos de micro"}
                route='/comunidad'/>


            </div>
        },


        {
            /*TAB: Acerce de*/
            id: 'about',title: 'Acerca de',icon: information,
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