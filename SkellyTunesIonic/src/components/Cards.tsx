import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Cards.css'; // Asegúrate de tener un archivo CSS para estilos personalizados
import React from 'react';

// Modificar contenido de cards.
interface CardProps {
  image: string;
  title?: string; // Hacer que title sea opcional
  subtitle?: string; // Hacer que subtitle sea opcional
  content?: string; // Hacer que content sea opcional
}

//Se crea como constante para poder modificarla

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