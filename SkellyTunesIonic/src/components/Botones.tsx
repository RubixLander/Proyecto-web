//Import de Elementos IONIC/REACT
import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';

//Import de css
import './Botones.css';

//Variables de botones
interface datosBoton {
    icon?: any;
    text?: string;
    color?: string;
    className?: string;
    shape?: 'round' | undefined;
    size?: "default" |"large" | "small" | undefined;
    expand?: "block" | "full" | undefined;
    route?: string;
    slot?: string  
} 

//Boton que dibuja iconos
export const BotonIcono: React.FC<datosBoton> = ({ icon, text, color, className, shape, size, expand, route, slot }) => {;
  //Logica de redireccionado
  const history = useHistory(); 

  const handleClick = () => {
    if (route) {
        window.location.href = route;
    }
};

  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand} onClick={handleClick}>
        <IonIcon slot={slot} icon={icon}></IonIcon>
        {text}
      </IonButton>
    );
}

//Boton con solo texto
export const BotonGeneral: React.FC<datosBoton> = ({ text, color, className, shape, size, expand, route }) => {
  //Logica de redireccionado
  const history = useHistory(); 

  const handleClick = () => {
    if (route) {
        window.location.href = route; 
    }
  };
  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand} onClick={handleClick}>
        {text}
      </IonButton>
    );
}