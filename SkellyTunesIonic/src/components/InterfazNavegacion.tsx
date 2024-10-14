//Import de Elementos IONIC/REACT
import React from 'react';
import { IonButtons, IonHeader, IonMenu, IonMenuButton, IonPage, IonToolbar, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import { close, home, albums, person, people, settings, logOut } from 'ionicons/icons';

//Import de Componentes
import { BotonIcono, BotonGeneral } from './Botones';

//Import de assets
import logo from '../assets/logo.gif';

//Import de CSS
import './Interfaz.css';

// Contenido de la Pagina
interface MenuLayoutProps {
    children: React.ReactNode;
}

// Definir Interfaz
const Interfaz: React.FC<MenuLayoutProps> = ({ children }) => {
    return (
        <>
            {/* MENU (Sidebar) */}
            <IonMenu contentId="main-content">
                <div className="menu-container">
                    {/* Header de Sidebar */}
                    <div className='menu-header-button'>
                        <IonButton fill="clear" slot="end" size="default" className='close-menu-button' onClick={() => document.querySelector('ion-menu')!.close()}>
                            <IonIcon slot="icon-only" icon={close}></IonIcon>
                        </IonButton>
                    </div>

                    <div className='menu-header'>
                        <div className="logo">
                            <img src={logo} alt="skellydance" className="logo-image" />
                            <h1 className="title-custom">SkellyTunes</h1>
                        </div>
                    </div>

                    {/* Cuerpo de Sidebar */}
                    <div className="menu-content">
                        <BotonIcono expand="block" shape="round" icon={home} slot="start" className="menuOpciones" text="Inicio" route='/home' />
                        <BotonIcono expand="block" shape="round" icon={albums} slot="start" className='menuOpciones' text="Biblioteca" route='/biblioteca'/>
                        <BotonIcono expand="block" shape="round" icon={person} slot="start" className='menuOpciones' text="Perfil" route='/perfil' />
                        <BotonIcono expand="block" shape="round" icon={people} slot="start" className='menuOpciones' text="Comunidades" />
                        <BotonIcono expand="block" shape="round" icon={settings} slot="start" className='menuOpciones' text="Configuración" />
                        <BotonIcono expand="block" shape="round" icon={logOut} slot="start" className='menuOpciones' text="Cerrar Sesión" />
                        {/* Footer de Sidebar */}
                        <div className="menu-footer">
                            <footer>@ 2024 SkellyTunes - Todos los derechos reservados</footer>
                        </div>
                    </div>
                </div>
            </IonMenu>

            {/* Creación de pagina */}
            <IonPage id="main-content">
                {/* Header de Pagina */}
                <IonHeader>
                    {/* TOOLBAR (Navbar) */}
                    <IonToolbar className="toolbar">
                        <div className="toolbar-custom">

                            <div className="logo-menu-container">
                              <IonButtons slot="start">
                                  <IonMenuButton className="custom-menu-icon" />
                              </IonButtons>

                              <div className="logo" onClick={() => window.location.href = '/home'}>
                                <img src={logo} alt="skellydance" className="logo-image" />
                                <h1 className="title-custom">SkellyTunes</h1>
                              </div>
                              
                            </div>

                            <div className="search-container">
                                <IonSearchbar placeholder="¿Qué deseas buscar?" className="custom-searchbar" />
                            </div>

                            <div className="button-container">
                                <BotonGeneral color="light" text="Iniciar Sesión" route="/iniciosesion" />
                                <BotonGeneral color="success" text="Registrarse" />
                            </div>

                        </div>
                    </IonToolbar>
                </IonHeader>

                {/* CUERPO DE LA PAGINA */}
                {children}
            </IonPage>
        </>
    );
};

export default Interfaz;
