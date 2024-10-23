//Import de Elementos IONIC/REACT
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel, IonButton,IonBadge, IonIcon } from '@ionic/react';
import { IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import { musicalNotes } from 'ionicons/icons'; 

//Import de CSS
import './Cards.css'; 


//Contenido de card.
interface CardProps {
  image?: string;
  title?: string; 
  subtitle?: string; 
  content?: string;
  icon?: string; 
}

interface CardListProps {
  items: Array<{ id: number; label: string; imageUrl: string }>;
}

export const AlbumCard: React.FC<CardProps> = ({ image, title, subtitle, content, icon }) => {
  return (
    <IonCard button={true} className="AlbumCard">
      <div className="album-image-container">
        <img alt={title} src={image} className="album-image" />
        {icon && <IonIcon icon={icon} className="overlay-icon" />}
      </div>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {content}
      </IonCardContent>
    </IonCard>
  );
}

export const UserCard: React.FC<CardProps> = ({ image, title, subtitle, content }) => {
  return (
    <IonCard button={true} className="UserCard">
      <div className="user-image-container">
        <img alt={title} src={image} className="user-image" />
      </div>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {content}
        <IonButton  color="dark" size='small'>Seguir</IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export const DynamicCard: React.FC<CardProps> = ({ title, subtitle, content, image }) => {
  return (
    <IonCard button={true} className="playlist-card">
      <IonGrid>
        <IonRow>
          {image && (
            <IonCol size="4" style={{ display: 'flex' }}>
    <div className="image-container">
        <IonImg src={image} className="playlist-square-image" />
    </div>
</IonCol>
          )}
          <IonCol>
            <div className="playlist-content-container">
              <div className="playlist-title-container">
                <div>
                  <IonCardHeader>
                    <IonCardTitle>{title}</IonCardTitle>
                    <IonCardSubtitle>{subtitle}</IonCardSubtitle>
                  </IonCardHeader>
                </div>
              </div>
              <IonCardContent>
                <div>{content}</div>
              </IonCardContent>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="playlist-badge-container">
        <IonBadge className="playlist-custom-badge" color="primary">
          <IonIcon icon={musicalNotes} color="light" className="playlist-badge-icon" /> 
          12
        </IonBadge>
      </div>
    </IonCard>
  );
};

export const CardList: React.FC<CardListProps> = ({ items }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {items.map(item => (
            <IonItem key={item.id}>
              <IonThumbnail slot="start">
                <img alt="Thumbnail" src={item.imageUrl} />
              </IonThumbnail>
              <IonLabel>{item.label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
