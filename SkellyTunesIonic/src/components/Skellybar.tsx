import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFooter,IonSearchbar } from '@ionic/react';
import {BotonesIconos, BotonGeneral} from './Botones';
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
                <BotonesIconos expand="block" shape="round" className="menuOpciones" icon={home} text="Inicio"/>
                <BotonesIconos expand="block" shape="round" icon={albums} className='menuOpciones' text="Biblioteca"/>
                <BotonesIconos expand="block" shape="round" icon={person} className='menuOpciones' text="Perfil"/>
                <BotonesIconos expand="block" shape="round" icon={people} className='menuOpciones' text="Comunidades"/>
                <BotonesIconos expand="block" shape="round" icon={settings} className='menuOpciones' text="Configuración"/>
                <BotonesIconos expand="block" shape="round" icon={logOut} className='menuOpciones' text="Cerrar Sesión"/>
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
                  <BotonGeneral color="light" text="Iniciar Sesión"/>
                  <BotonGeneral color="success" text="Registrarse"/>
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