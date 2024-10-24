//Import de Elementos IONIC/REACT
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonIcon } from '@ionic/react';
import { chatbubbles, library, people, star , radio, albums, calendar, earth, logoSoundcloud, logoInstagram, information} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import {BotonGeneral} from '../components/Botones';
import TabsNavegacion from '../components/Tabs'
import {AlbumCard, CommunityCard, UserCard} from '../components/Cards';

//Import de datos
import albumsData from '../data/albums.json';

//Import de CSS
import './comunidad.css';


import { useAuth } from '../contexts/autentificacion';




const Comunidad: React.FC = () => {
    const {isAuthenticated} = useAuth();

    /*CONTENIDO DE PAGINAS DE PERFIL*/
    const tabs = [
        {
            /*TAB: Discusiones*/
            id: 'discussions', title: 'Discusiones', icon: chatbubbles,
            content: 

            /*Contenido*/
            <IonContent className="scrollable">

            </IonContent>
        },


        {
             /*TAB: Destacados*/
             id: 'featured', title: 'Destacados', icon: star,
             content: 
 
             /*Contenido*/
             <IonContent className="scrollable">
                 <div className="CardsContainer">
                 <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                 <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                 <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                 <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                 <AlbumCard image={"https://f4.bcbits.com/img/a1986450066_16.jpg"} title={"a"} subtitle={"a"} />
                 </div>
 
             </IonContent>
 
         },

        {
             /*TAB: Miembros*/
            id: 'members', title: 'Miembros', icon: people,
            content:

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
                <UserCard image={"https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca"} title={"t e l e p a t h"} subtitle={"@telepath0s"}/>
                <UserCard image={"https://f4.bcbits.com/img/0033779152_10.jpg"} title={"[minimo]"} subtitle={"@minimo"} route='/perfil' />
            </div>
            </IonContent> 
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
                    <p>bienvenidos al el dia del payaso este dia los payasitos se reunen para hacer unos chistositos bien grasiositos 
                        "oigale, cuente un chiste!" "....ehhhh...." El dia del payaso 1 de abril de cualquier año, asi es, todos los 
                        payasitos se reunen para hacer felices a los niñitos, y a los grandecitos tambien- el dia del payaso 1 te comes 4 
                        el dia del payaso Este dia, los niños se ponen felices, porque llega el payasito a darles unas graciosadas y unos chistositos 
                        "Oye, esta el señor payaso, el señor payach-!" .... El dia del payaso Hay muchos payasitos, esta el payasito chistosito, la payasita sin chichita, 
                        el payacho cacho HAHAA el dia del payaso en otros lugares El dia del payaso se celebra en otro dia, por ejemplo El Dia del payaso Se celebra 
                        en el dia del payaso el dia del payaso Todos los payasitos llegan en su carrito para .. Nose heh Subanse al carrito del payasito y disfruten 
                        sus payasadas en todo el camino "Ya vamo a llegar?" "AGHAGHAGH"" Eh , eso no es un paya-" El dia del payaso Ese dia usted vaya con el payasito y 
                        digale felicidades por El dia del payaso "Hola soy un payaso" "HOLA SEÑOR PAYASO, FELICIDADES POR EL DIA DEL PAYASO" lo golpea hasta que gime 
                        El dia, solo este dia se celebra en payasolandia, pero en otros lugares se celebra El dia del payaso El dia del payaso Muchos globitos, 
                        salen..c rie.. ???... to apreta- El dia del payaso Los payasitos tambien se encuentran en el internet, por ejemplo: el payaso libro y el ...
                        el pwip HAHA el dia del payasoo "SOY EL PAYACHITO, EL PAYACHITO DE PLAYA" "el playacho" ..."Oigan usted quien es?" El dia del payaso Pero este 
                        solo se celebra pa' aya, aca somo El dia del payaso Asi que no esperes mas, celebra a tu payasito favorito este dia, y solo es 1, 
                        porque mañana es 2 HAHAAAAA, QUE TONTERIA EL DIA DEL PAYASO c rie mas El dia del payaso</p>

                    {/* Detalles */}
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
                        <div className="comunidad-cabecera">
                                <img className = "comunidad-cabecera-foto" src="https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs="/>
                                <div className="comunidad-cabecera-info">
                                    <h1>Los payasos de micro</h1>
                                    <p>Porque la vida es una comedia</p>
                                </div>


                                <div className="comunidad-cabecera-btn">
                                    <BotonGeneral text='Unirse' color='dark' size='small'/>
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

export default Comunidad;