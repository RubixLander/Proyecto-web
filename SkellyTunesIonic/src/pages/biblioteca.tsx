import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {InterfazGeneral} from '../components/Interfaces';

const Biblioteca: React.FC = () => {
    return (
        <IonPage>
            <InterfazGeneral>

            <IonContent>
                {/* Aquí puedes agregar el contenido de tu página */}
                <h1>Bienvenido a la Nueva Página</h1>
            </IonContent>
            </InterfazGeneral>
        </IonPage>
    );
};

export default Biblioteca;