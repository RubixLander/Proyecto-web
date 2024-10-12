import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFooter,IonSearchbar } from '@ionic/react';
import BotonMenu from './Botones';
import { close, home, albums, person, people, settings, logOut } from 'ionicons/icons';
import logo from '../assets/logo.gif';
import './Skellybar.css';

//Contenido de la Pagina
interface MenuLayoutProps {
    children: React.ReactNode;
}

//Definir Interfaz
const MenuLayout: React.FC<MenuLayoutProps> = ({ children }) => {
    return (
      <>
        {/*MENU (Sidebar)*/}
        <IonMenu contentId="main-content">
          <div className="menu-container">

          {/*Header de Sidebar*/}
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

            {/*Cuerpo de Sidebar*/}
            <div className="menu-content">
                <BotonMenu icon={home} text="Inicio" />
                <BotonMenu icon={albums} text="Biblioteca" />
                <BotonMenu icon={person} text="Perfil" />
                <BotonMenu icon={people} text="Comunidades" />
                <BotonMenu icon={settings} text="Configuración" />
                <BotonMenu icon={logOut} text="Cerrar Sesión" />

                {/*Footer de Sidebar*/}
                <div className="menu-footer">
                <footer>@ 2024 SkellyTunes - Todos los derechos reservados</footer>
                </div>
            </div>


          </div>
        </IonMenu>

        {/*Creación de pagina*/}
        <IonPage id="main-content">

          {/*Header de Pagina*/}
          <IonHeader>

            {/*TOOLBAR (Navbar)*/}
            <IonToolbar className="toolbar">

              <div className="toolbar-custom">
                <IonButtons slot="start">
                  <IonMenuButton className="custom-menu-icon" />
                </IonButtons>

                <div className="logo">
                  <img src={logo} alt="skellydance" className="logo-image" />
                  <h1 className="title-custom">SkellyTunes</h1>
                </div>

                <div className="search-container">
                  <IonSearchbar placeholder="¿Qué deseas buscar?" className="custom-searchbar" />
                </div>

                <div className="button-container">
                  <IonButton color="light">Iniciar Sesión</IonButton>
                  <IonButton color="success">Registrarse</IonButton>
                </div>
              </div>
            </IonToolbar>
          </IonHeader>

          {/*CUERPO DE LA PAGINA*/}
          {children}
          
        </IonPage>
      </>
    );
};
  
export default MenuLayout;