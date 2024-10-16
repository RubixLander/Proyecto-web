//Import de Elementos IONIC/REACT
import React from 'react';
import { IonButtons, IonHeader, IonMenu, IonMenuButton, IonPage, IonToolbar, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import { close, home, albums, person, people, settings, logOut, arrowUpCircle } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';

//Import de Componentes
import { BotonIcono, BotonGeneral } from './Botones';

//Import de assets
import logo from '../assets/logo.gif';

//Import de CSS
import './Interfaces.css';

import { useAuth } from '../contexts/autentificacion';



// Contenido de la Pagina
interface MenuLayoutProps {
    children: React.ReactNode;
}

// Definir Interfaz
export const InterfazGeneral: React.FC<MenuLayoutProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const existingUsers = localStorage.getItem('users');
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
                        <BotonIcono expand="block" shape="round" icon={settings} slot="start" className='menuOpciones' text="Ajustes" route='/AjustePerfil'/>
                    {/*Cerrar sesion borra los datos locales guardados, por lo que al intentar iniciar sesion con un usuario creado anteriormente 
                    no se podra, esto es para prototipar la funcion con backend para la proxima entrega.*/}
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
                            {isAuthenticated ? (
                                //Sesion Iniciada
                                <IonButtons slot="start">
                                    <IonMenuButton className="custom-menu-icon" />
                                </IonButtons>
                            ) : (
                                //Sin  Iniciar
                                <IonButtons slot="start">
                                    <IonMenuButton className="custom-menu-icon" disabled={true}/>
                                </IonButtons>
                            )}

                              <Link to="/home" className="logo">
                                    <img src={logo} alt="skellydance" className="logo-image" />
                                    <h1 className="title-custom">SkellyTunes</h1>
                                </Link>
                              
                            </div>

                            <div className="search-container">
                                <IonSearchbar placeholder="¿Qué deseas buscar?" className="custom-searchbar" />
                            </div>

                            {isAuthenticated ? (
                                //Sesion Iniciada
                                <div className="right-side-container">
                                    <IonItem className='avatar-container'>
                                        <IonLabel className='avatar-info' >(NOMBREUSUARIO) @tag</IonLabel>
                                    </IonItem>
                                    <IonAvatar slot="start" className='avatar'>
                                        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                        </IonAvatar>

                                </div>
                            ) : (
                                //Sin  Iniciar
                                <div className="right-side-container">
                                <BotonGeneral color="light" text="Iniciar Sesión" route="/iniciosesion" />
                                <BotonGeneral color="success" text="Registrarse" route="/registro"/>
                                </div>
                            )}

                        </div>
                    </IonToolbar>
                </IonHeader>

                {/* CUERPO DE LA PAGINA */}
                {children}
            </IonPage>
        </>
    );
};

// Definir Interfaz
export const InterfazSimple: React.FC<MenuLayoutProps> = ({ children }) => {
    return (
        <>
            {/* Creación de pagina */}
            <IonPage id="main-content">
                {/* Header de Pagina */}
                <IonHeader>
                    {/* TOOLBAR (Navbar) */}
                    <IonToolbar className="toolbar">
                        <div className="toolbar-custom-simple">

                              <Link to="/home" className="logo">
                                    <img src={logo} alt="skellydance" className="logo-image" />
                                    <h1 className="title-custom">SkellyTunes</h1>
                                </Link>

                        </div>
                    </IonToolbar>
                </IonHeader>

                {/* CUERPO DE LA PAGINA */}
                {children}
            </IonPage>
        </>
    );
};

