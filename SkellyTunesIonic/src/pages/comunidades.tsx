import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon, IonList, IonLabel,IonItem } from '@ionic/react';
import { albums, time, personAdd, thumbsUp, list, bookmark, arrowUpCircle, people, compass, person, } from 'ionicons/icons';
import {InterfazGeneral} from '../components/Interfaces';
import './biblioteca.css';
import { AlbumCard,CommunityCard } from '../components/Cards';
import TabsNavegacion from '../components/Tabs'

const Comunidades: React.FC = () => {
    /*CONTENIDO DE PAGINAS DE PERFIL*/
    const tabs = [
        {
            /*TAB: Tus Comunidades*/
            id: 'yours', title: 'Tu Actividad', icon: person,
            content: 

            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                    <h4>Ve las comunidades en las que participas!</h4>
                    </div>
                
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
            <div className='TabContentContainer'>
                    <h4>Ve tus discusiones recientes!</h4>
                    </div>


            </IonContent>
        },

        {
             /*TAB: Explorar*/
            id: 'explore', title: 'Explorar', icon: compass,
            content: 

            /*Contenido*/
            <IonContent className="scrollable">
                <div className='TabContentContainer'>
                <h4>Explora otras comunidades!</h4>
                </div>


                <div className='community-container'>

                <CommunityCard 
                topImage={"https://i.scdn.co/image/ab6775700000ee851c90ca347394ad0ce0b68046"} 
                image={"https://scontent-scl2-1.xx.fbcdn.net/v/t39.30808-6/369315461_880463900260778_5464328731750021069_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Qb-5wmOl4ccQ7kNvgFc21wu&_nc_zt=23&_nc_ht=scontent-scl2-1.xx&_nc_gid=A2S41O7gJoSXLIbEiblwoVG&oh=00_AYDYrWBk0JBb3KcDwvtGHnstnSCxzAKxusdpV0-ldxJ0MA&oe=671F1E86"} 
                title={"MetalHead Community"}/>

                <CommunityCard 
                topImage={"https://m.media-amazon.com/images/I/51qId39VZrL.jpg"} 
                image={"https://attwellfarmpark.co.uk/storage/media/56/conversions/JbZrzKSSO6VFis6Z6vIhI0V691o8m2asMg13KuJm-card@1x.jpg"} 
                title={"Ducks"}/>

                <CommunityCard 
                topImage={"https://styles.redditmedia.com/t5_2ugcd/styles/communityIcon_irv7jyglvxh01.png"} 
                image={"https://undergroundlab.es/wp-content/uploads/2020/10/vaporwave.jpg"} 
                title={"Music Optimized for Abandoned Malls"}/>

                <CommunityCard 
                topImage={"https://styles.redditmedia.com/t5_39nwj/styles/communityIcon_ougx773hnv9d1.png"} 
                image={"https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHVycGxlJTIwZ3JhZGllbnR8ZW58MHx8MHx8fDA%3D"} 
                title={"PopHeads"}/>

                <CommunityCard 
                topImage={"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846ee3962949223bca75e660fe"} 
                image={"https://i.scdn.co/image/ab67616d00001e022ab8ae444940b57c7ef5b329"} 
                title={"sad hours club"}/>

                <CommunityCard 
                topImage={"https://tr.rbxcdn.com/b58e6df80b03fed16fab26fb8467bb47/420/420/Hat/Webp"} 
                image={"https://media.istockphoto.com/id/1190295119/es/foto/objeto-volador-no-identificado-ruta-de-recorte-incluida.jpg?s=612x612&w=0&k=20&c=E70Ry1LrYCbRByEee9lCIbP0EyOr4g9HpycKK2T4EDM="} 
                title={"Yee Yee Cult"}/>
              
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
                            <IonIcon icon={people} className="custom-header-icono" />
                            <IonTitle className="custom-header-titulo">Comunidades</IonTitle>
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

export default Comunidades;