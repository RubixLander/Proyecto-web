import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Skellybar from '../components/InterfazNavegacion';

const Inicio: React.FC = () => {
    return (
        <IonPage>
            <Skellybar>

            <IonContent>
                {/* Aquí puedes agregar el contenido de tu página */}
                <h1>Bienvenido a la Nueva Página</h1>
            </IonContent>
            </Skellybar>
        </IonPage>
    );
};

export default Inicio;