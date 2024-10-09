import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';

import './Botones.css';

interface MenuOpcionesProps {
    icon: any; // Puedes usar un tipo más específico si lo deseas
    text: string;
  }
  

function MenuOpciones({ icon, text }: MenuOpcionesProps) {
    return (
        <IonButton expand="block" shape="round" size="default" className="menuOpciones">
          <IonIcon slot="start" icon={icon}></IonIcon>
          {text}
        </IonButton>
      );
    }
export default MenuOpciones;