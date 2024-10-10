import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Inicio: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Nueva Página</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* Aquí puedes agregar el contenido de tu página */}
                <h1>Bienvenido a la Nueva Página</h1>
            </IonContent>
        </IonPage>
    );
};

export default Inicio;