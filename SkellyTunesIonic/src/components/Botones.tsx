import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import './Botones.css';
import { useHistory } from 'react-router-dom'; // Importa useHistory

interface datosBoton {
    icon?: any;
    text: string;
    color?: string;
    className?: string;
    shape?: 'round' | undefined;
    size?: "default" |"large" | "small" | undefined;
    expand?: "block" | "full" | undefined;
    route?: string;  
} 


export const BotonesIconos: React.FC<datosBoton> = ({ icon, text, color, className, shape, size, expand, route }) => {;
  const history = useHistory(); // Inicializa useHistory

  const handleClick = () => {
      if (route) {
          history.push(route); // Redirige a la ruta especificada
      }
  };

  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand} onClick={handleClick}>
        <IonIcon slot="start" icon={icon}></IonIcon>
        {text}
      </IonButton>
    );
}

export const BotonGeneral: React.FC<datosBoton> = ({ text, color, className, shape, size, expand, route }) => {
  const history = useHistory(); // Inicializa useHistory

  const handleClick = () => {
      if (route) {
          history.push(route); // Redirige a la ruta especificada
      }
  };
  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand} onClick={handleClick}>
        {text}
      </IonButton>
    );
}