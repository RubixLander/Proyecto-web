import React from 'react';
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { musicalNotes } from 'ionicons/icons';
import "./Lists.css";

interface Song {
  title: string;
  duration: string; // Formato "mm:ss"
}

interface SongListProps {
  album: string;
  songs: Song[];
  onSongClick: (song: Song) => void; // Prop para manejar el clic
}

export const SongList: React.FC<SongListProps> = ({ songs, onSongClick, album }) => {
  return (
    <IonAccordionGroup>
      <IonAccordion value="open"> {/* Mantiene el acordeón abierto */}
        <IonItem color="dark" slot="header" className="song-list-header" style={{ display: 'flex', alignItems: 'center' }}>
          <IonIcon icon={musicalNotes} style={{ fontSize: '24px', marginRight: '10px' }} />
          <IonLabel>{album} • Lista de Canciones</IonLabel>
        </IonItem>
        <div slot="content" className="song-list-container">
          {songs.map((song, index) => (
            <IonItem key={index} button onClick={() => onSongClick(song)}>
              <IonLabel style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>{index + 1}.</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: 0 }}>{song.title}</h3>
                  <p style={{ margin: 0 }}>{song.duration}</p>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
};



