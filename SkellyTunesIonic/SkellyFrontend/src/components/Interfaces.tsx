//Import de Elementos IONIC/REACT
import React, { useState, useEffect } from 'react';
import { IonButtons, IonHeader, IonMenu, IonMenuButton, IonPage, IonToolbar, IonButton, IonIcon, IonSearchbar, IonToast } from '@ionic/react';
import { close, home, library, person, people, settings, logOut, alert} from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { useLogo } from '../contexts/eventoespecial';

//Import de Componentes
import { BotonIcono, BotonGeneral } from './Botones';
import Toast from './Toast';

//Import de assets
import normallogo from '../assets/logo.gif';
import shinylogo from '../assets/shinylogo.gif'

//Import de CSS
import './Interfaces.css';

import { useAuth } from '../contexts/autentificacion';

//Puentes
import api from '../api/api';

// Contenido de la Pagina
interface MenuLayoutProps {
    children: React.ReactNode;
}

// Definir Interfaz
export const InterfazGeneral: React.FC<MenuLayoutProps> = ({ children }) => {
    const [userData, setUserData] = useState<{ avatar: string; nombre: string; tag: string } | null>(null);

    const [error, setError] = useState<string | null>(null);

    const { isShiny, toastShown, setToastShown } = useLogo(); // Obtiene isShiny y toastShown
    const logo = isShiny ? shinylogo : normallogo; // Determina el logo
    const { isAuthenticated } = useAuth();
    
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (isShiny && !toastShown) {
            setShowToast(true); // Muestra el toast si isShiny es true
            setToastShown(true); // Marca el toast como mostrado en el contexto
        }
    }, [isShiny, toastShown, setToastShown]);

    useEffect(() => {
        // Obtener el userTag del localStorage
        const userTag = localStorage.getItem('userTag');
        console.log(userTag);
        if (!userTag) {
          console.error('El usuario no está autenticado');
          setError('No estás autenticado');
          return;
        }
    
        // Codificar el tag si está presente
        const encodedUserTag = encodeURIComponent(userTag);
    
        // Método para obtener los datos del usuario
        const fetchUserData = async () => {
          try {
            const response = await api.get('/usuario/datosbarra', { params: { userTag: encodedUserTag } });
            setUserData(response.data); // Guardar los datos en el estado
          } catch (err: any) {
            if (err.response) {
              setError(err.response.data.error); // Error proporcionado por el servidor
            } else {
              setError('Error al conectar con el servidor.');
            }
          }
        };
    
        fetchUserData();
      }, []); // El array vacío asegura que se ejecute solo una vez cuando el componente se monte

    return (
        <>
            {/* MENU (Sidebar) */}
            <IonMenu contentId="main-content" swipeGesture={false}>
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
                <h1 className={isShiny ? 'shiny-title-custom' : 'title-custom'}>Skelly</h1>
                <h1 className='title-custom'>Tunes</h1>
            </div>
                    </div>

                    {/* Cuerpo de Sidebar */}
                    <div className="menu-content">
                        <BotonIcono expand="block" shape="round" icon={home} slot="start" className="menuOpciones" text="Inicio" route='/home' />
                        <BotonIcono expand="block" shape="round" icon={library} slot="start" className='menuOpciones' text="Biblioteca" route='/biblioteca'/>
                        <BotonIcono expand="block" shape="round" icon={person} slot="start" className='menuOpciones' text="Perfil" route={`/perfil/${userData?.tag}`} />
                        <BotonIcono expand="block" shape="round" icon={people} slot="start" className='menuOpciones' text="Comunidades" route="/comunidades"/>
                        <BotonIcono expand="block" shape="round" icon={settings} slot="start" className='menuOpciones' text="Ajustes" route='/AjustePerfil'/>
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
                            {isAuthenticated && (
                                //Sesion Iniciada
                                <IonButtons slot="start">
                                    <IonMenuButton className="custom-menu-icon" />
                                </IonButtons>
                            )}


                            <Link to="/home" className="logo">
                            <img src={logo} alt="skellydance" className="logo-image" />
                            <h1 className={isShiny ? 'shiny-title-custom' : 'title-custom'}>Skelly</h1>
                            <h1 className='title-custom'>Tunes</h1>
                            </Link>

                              
                            </div>

                            <div className="search-container">
                                <IonSearchbar placeholder="¿Qué deseas buscar?" className="custom-searchbar" />
                            </div>

                            {isAuthenticated ? (
                                //Sesion Iniciada
                                <div className="right-side-container">
                                    <IonItem className='avatar-container'>
                                        <IonLabel className='avatar-info' >{userData?.nombre} {userData?.tag}</IonLabel>
                                    </IonItem>
                                    <IonAvatar slot="start" className='avatar'>
                                        <img alt="avatar" src={userData?.avatar} />
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
                {showToast && (
                    <Toast icon={alert} message="Ha aparecido un Shiny Skelly" duration={4000} />
                )}
                {children}

            </IonPage>
        </>
    );
};

// Definir Interfaz
export const InterfazSimple: React.FC<MenuLayoutProps> = ({ children }) => {
    const { isShiny } = useLogo(); // Obtiene isShiny y toastShown
    const logo = isShiny ? shinylogo : normallogo; // Determina el logo



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
                              <h1 className={isShiny ? 'shiny-title-custom' : 'title-custom'}>Skelly</h1>
                              <h1 className='title-custom'>Tunes</h1>
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


