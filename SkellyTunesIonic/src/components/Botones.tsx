// Import de Elementos IONIC/REACT
import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';

// Import de css
import './Botones.css';

// Variables de botones
interface datosBoton {
    icon?: any;
    text?: string;
    color?: string;
    className?: string;
    shape?: 'round' | undefined;
    size?: "default" | "large" | "small" | undefined;
    expand?: "block" | "full" | undefined;
    route?: string;
    slot?: string  
}

interface botonPeter {
    icon?: any;
    text?: string;
    color?: string;
    className?: string;
    shape?: 'round' | undefined;
    size?: "default" | "large" | "small" | undefined;
    expand?: "block" | "full" | undefined;
    route?: string;
    slot?: string  
    onClick?: () => void;
}

// Boton que dibuja iconos
export const BotonIcono: React.FC<datosBoton> = ({ icon, text, color, className, shape, size, expand, route, slot }) => {
  // Lógica de cierre de sesión
  const history = useHistory();
  
  const handleClick = () => {
      // Si es el botón de cerrar sesión
      if (text === "Cerrar Sesión") {
          localStorage.clear(); // Elimina todos los datos de localStorage
          history.push('/inicioSesion'); // Redirigir a la página de inicio de sesión
      } else if (route) {
          window.location.href = route; // Redireccionar a la ruta especificada
      }
  };

  return (
      <IonButton shape={shape} size={size} className={className} color={color} expand={expand} onClick={handleClick}>
          <IonIcon slot={slot} icon={icon}></IonIcon>
          {text}
      </IonButton>
  );
}

// Boton con solo texto
export const BotonGeneral: React.FC<datosBoton> = ({ text, color, className, shape, size, expand, route }) => {
    // Lógica de redireccionado
    const handleClick = () => {
        if (route) {
            window.location.href = route;
        }
    };
    
    return (
        <IonButton shape={shape} size={size} className={className} color={color} expand={expand} onClick={handleClick}>
            {text}
        </IonButton>
    );
}

export const BotonPeter: React.FC<botonPeter> = ({ onClick, text, color, className, shape, size, expand, route }) => {
    // Lógica de redireccionado
    const history = useHistory(); 

    const handleRegister = () => {
        if (route) {
            history.push(route); 
        }
    };

    return (
        <IonButton shape={shape} size={size} className={className} color={color} expand={expand} onClick={onClick}>
            {text}
        </IonButton>
    );
}
