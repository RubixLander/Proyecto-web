import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Inicio from './pages/inicioSesion';
import Perfil from './pages/perfil';
import Biblioteca from './pages/biblioteca';
import Registro from './pages/RegistroSesion';
import AjustePerfil from './pages/AjustePerfil';
import {InterfazGeneral} from './components/Interfaces';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet animated={false}>
        
        <Route exact path="/registro"><Registro /></Route>
        <Route exact path ="/inicioSesion"><Inicio/></Route>


      <InterfazGeneral>  
      <Route exact path="/biblioteca"><Biblioteca /></Route>
        <Route exact path="/perfil"><Perfil /></Route>
        <Route exact path="/home"><Home /></Route>

        <Route exact path="/ajustePerfil"><AjustePerfil /></Route>
        <Route exact path="">
          <Redirect to="/home" />
        </Route>
        </InterfazGeneral>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
