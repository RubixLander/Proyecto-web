//Import de Elementos IONIC/REACT
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

//Import de CSS
import './Cards.css'; 


//Contenido de card.
interface CardProps {
  image: string;
  title?: string; 
  subtitle?: string; 
  content?: string; 
}

//Funcion card
const Cards: React.FC<CardProps> = ({ image, title, subtitle, content }) => {
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

export default Cards;