
// src/pages/inicioSesion.tsx
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { BotonPeter } from '../components/Botones';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { InterfazSimple } from '../components/Interfaces';
import { useAuth } from '../contexts/autentificacion';
import './Reginit.css';

const InicioSesion: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const handleLogin = () => {
        // Obtener datos de usuarios existentes
        const existingUsers = localStorage.getItem('users');
        const usersArray = existingUsers ? JSON.parse(existingUsers) : [];

        // Verificar si el usuario existe y si la contraseña es correcta
        const user = usersArray.find((user: { username: string; password: string; }) => user.username === username && user.password === password);
        
        if (user) {
            // Si el usuario existe, redirigir a la página de inicio
            login();
            history.push('/home');
        } else {
            alert("Nombre de usuario o contraseña incorrectos");
        }
    };

    return (
        <IonPage>
            <InterfazSimple>
                <IonHeader>
                </IonHeader>
                <IonContent>
                    <div className='inicio-container'>
                        <div className="rigin-box"> 
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Nombre De Usuario</IonLabel>
                            <IonInput
                                placeholder='Ingrese su nombre de usuario'
                                value={username}
                                onIonChange={e => setUsername(e.detail.value!)}
                                type="text"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Contraseña</IonLabel>
                            <IonInput
                                placeholder='Ingrese su contraseña'
                                value={password}
                                onIonChange={e => setPassword(e.detail.value!)}
                                type="password"
                                required
                            />
                        </IonItem>
                    </IonList>
                    <BotonPeter onClick={handleLogin} className="menuOpciones" expand="full" text="Iniciar Sesión" />
                    <IonText>
                        <div style={{ textAlign: 'center', margin: '20px 0', color: 'white' }}>
                            <p>¿No tienes cuenta?</p>
                            <Link to="/registro" style={{ textDecoration: 'underline', color: 'aqua' }}>
                                Regístrate aquí
                            </Link>.
                        </div>
                    </IonText>
                </div>
            </div>
        </IonContent>
    </InterfazSimple>
</IonPage>
);
};

export default InicioSesion;
