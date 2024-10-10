import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import './Botones.css';

interface datosBoton {
    icon?: any;
    text: string;
    color?: string;
    className?: string;
    shape?: 'round' | undefined;
    size?: "default" |"large" | "small" | undefined;
    expand?: "block" | "full" | undefined;  
} 

export const BotonesIconos: React.FC<datosBoton> = ({ icon, text, color, className, shape, size, expand }) => {
  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand}>
        <IonIcon slot="start" icon={icon}></IonIcon>
        {text}
      </IonButton>
    );
}

export const BotonGeneral: React.FC<datosBoton> = ({ text, color, className, shape, size, expand }) => {
  return (
      <IonButton shape = {shape} size = {size} className= {className} color = {color} expand = {expand}>
        {text}
      </IonButton>
    );
}