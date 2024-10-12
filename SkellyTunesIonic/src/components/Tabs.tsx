//Import de Elementos IONIC/REACT
import React from 'react';
import {IonTabs,IonTabBar,IonTabButton,IonIcon,IonTab,} from '@ionic/react';

//Elementos de un Tab
interface Tab {
    id: string;
    title: string;
    icon: any;
    content: React.ReactNode; // Contenido del tab
}

interface MyTabsProps {
    tabs: Tab[];
}

//Creacion de la barra de TABS + pagina de contenido
const MyTabs: React.FC<MyTabsProps> = ({ tabs }) => {
    return (
        <IonTabs>
            
            {/*Barra de Tabs*/}
            <IonTabBar slot="top">
                {tabs.map((tab) => (
                    <IonTabButton key={tab.id} tab={tab.id}>
                        <IonIcon icon={tab.icon} />
                        {tab.title}
                    </IonTabButton>
                ))}
            </IonTabBar>

            {/*Asignacion para contenido*/}
            {tabs.map((tab) => (
                <IonTab key={tab.id} tab={tab.id}>
                    {tab.content}
                </IonTab>
            ))}
        </IonTabs>
    );
};

export default MyTabs;