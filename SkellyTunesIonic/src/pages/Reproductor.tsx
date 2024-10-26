import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { InterfazGeneral } from '../components/Interfaces';
import { MainPlayerCard, AlbumCard } from '../components/Cards';
import { SongList } from '../components/Lists';
import { arrowUpCircle } from 'ionicons/icons';
import { LikeDislikeButtons } from '../components/Botones';
import Chat from '../components/Chat'; // Importa el componente Chat
import './Reproductor.css';

const Reproductor: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Comprobar el tamaño al montar
    window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener al desmontar
    };
  }, []);

  const songs = [
    { title: 'одинокий', duration: '1:20' },
    { title: 'ƤROℳISE ƦINǤ', duration: '3:45' },
    { title: 'ロマンチックな思い出 1', duration: '2:47' },
    { title: '無限CIGARℇƬƬℇ', duration: '4:36' },
    { title: 'как давно это было', duration: '1:30' },
    { title: 'STARALGIA', duration: '4:12' },
    { title: '฿EĐR☯☯M訪問', duration: '3:45' },
    { title: 'TAKE CARE OF YOU ', duration: '4:12' },
    { title: '~☗✧脳死✧☗~', duration: '3:45' },
    { title: 'マイルストーンKISS', duration: '4:12' },
    { title: 'ロマンチックな思い出 2', duration: '3:45' },
    { title: 'ウロボロス', duration: '4:12' },
    { title: 'SHE SLEEPS ELSEWHERE', duration: '3:45' },
    { title: 'アパート', duration: '4:12' },
    { title: 'LINIPトルコ石', duration: '3:45' },
    { title: 'ψευδής', duration: '4:12' },
    { title: 'NO ♡♡♡ NO $$$', duration: '3:45' },
  ];

  const handleSongClick = (song: { title: string; duration: string }) => {
    console.log(`Reproduciendo: ${song.title}`);
  };

  return (
    <IonPage>
      <InterfazGeneral>
        <IonContent className="ion-padding">
          <div className='player-container'>
            <MainPlayerCard 
              image='https://f4.bcbits.com/img/a0827190352_16.jpg' 
              title='ƤROℳISE ƦINǤ' 
              subtitle="death's dynamic shroud.wmv"
            />
            <div>
              {isSmallScreen && <LikeDislikeButtons />} 
              <SongList songs={songs} onSongClick={handleSongClick} album="失​わ​れ​た​時​REGRET"/> 
            </div>
          </div>

          <div className="user-info-container">
            <div className="user-info">
              <img
                src="https://f4.bcbits.com/img/0028663611_21.jpg"
                alt="Avatar del usuario"
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">death's dynamic shroud</span>
                <span className="user-tag">@dds</span>
              </div>
              <IonButton size='small' color="dark" className="follow-button margin-top" fill="solid">Seguir</IonButton>

            </div>
            {!isSmallScreen && <LikeDislikeButtons />}
          </div>

          <div className="chat-album-container">
            <div className="chat">
              <Chat />
            </div>
            <div className="album">
              <h3>Otras personas también escucharon:</h3>
              <AlbumCard 
                image={"https://f4.bcbits.com/img/a0972302045_16.jpg"} 
                title={"Cul de Sac"} 
                subtitle={"[minimo]"} 
                icon={arrowUpCircle} 
              />
            </div>
          </div>

        </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Reproductor;
