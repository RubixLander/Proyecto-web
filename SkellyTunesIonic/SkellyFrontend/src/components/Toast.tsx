// Example.js
import React, { useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { globe } from 'ionicons/icons';

function Toast({ message = 'Hello World!', icon = globe, duration = 3000 }) {
  const [toastConfig, setToastConfig] = useState({
    isOpen: false,
    message,
    duration,
    icon,
  });

  useEffect(() => {
    // Configuración del toast después de un segundo
    const newToastConfig = {
      isOpen: true,
      message,
      duration,
      icon,
    };

    const timer = setTimeout(() => {
      setToastConfig(newToastConfig);
    }, 1000);

    return () => clearTimeout(timer);
  }, [message, duration, icon]); // Dependencias para actualizar el toast si cambian los props

  return (
    <>
      <IonToast
        isOpen={toastConfig.isOpen}
        onDidDismiss={() => setToastConfig({ ...toastConfig, isOpen: false })}
        message={toastConfig.message}
        duration={toastConfig.duration}
        icon={toastConfig.icon}
      />
    </>
  );
}

export default Toast;
