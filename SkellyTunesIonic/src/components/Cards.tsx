//Import de Elementos IONIC/REACT
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import { IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';


//Import de CSS
import './Cards.css'; 


//Contenido de card.
interface CardProps {
  image?: string;
  title?: string; 
  subtitle?: string; 
  content?: string; 
}

interface CardListProps {
  items: Array<{ id: number; label: string; imageUrl: string }>;
}

//Funcion card
export const MediaCard: React.FC<CardProps> = ({ image, title, subtitle, content }) => {
  return (
    <IonCard button={true} className="EstilosCards">
      <img alt={title} src={image} />
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

export const DynamicCard: React.FC<CardProps> = ({ title, subtitle, content,image }) => {
  return (
    <IonCard button={true}>
      <IonGrid>
        <IonRow>
          {image && (
            <IonCol size="4">
              <IonImg src={image} className="card-image" />
            </IonCol>
          )}
          <IonCol size={image ? "8" : "12"}>
            <IonCardHeader>
              <IonCardTitle>{title}</IonCardTitle>
              <IonCardSubtitle>{subtitle}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {content}
            </IonCardContent>
          </IonCol>
        </IonRow>
      </IonGrid>
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
