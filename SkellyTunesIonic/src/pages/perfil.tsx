//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { playCircle, library, people } from 'ionicons/icons';

//Import de Componentes
import Skellybar from '../components/InterfazNavegacion';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import Cards from '../components/Cards';

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
            <div className = "CardsContainer">
            <Cards 
              image="https://f4.bcbits.com/img/a0972302045_16.jpg"
              title="Cul de Sac"
            /> 

            <Cards 
              image="https://f4.bcbits.com/img/a0164762771_16.jpg"
              title="COSMIC TAPES VOL.1"
            /> 
            <Cards
              image="https://f4.bcbits.com/img/a0206112719_16.jpg"
              title="(Proto​-​Minimo - Separate EP​)​VOL​.​1"
            />
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
            <Skellybar>

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
                                    <BotonGeneral text='Seguir' color='dark'/>
                                </div>
                        </div>
                    </IonHeader>

                    {/*CUERPO DE PERFIL*/}
                    <IonContent>
                        <TabsNavegacion tabs={tabs} /> {/*CONTENIDO TABS DEFINIDOS ARRIBA*/}
                    </IonContent>

            </Skellybar>
        </IonPage>
    );
};

export default Perfil;