//Import de Elementos IONIC/REACT
import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { useHistory, Link } from 'react-router-dom';

//Import de Componentes
import { BotonPeter } from '../components/Botones';
import { InterfazSimple } from '../components/Interfaces';

//Import de css
import './Reginit.css';

//Import de contexto
import { useAuth } from '../contexts/autentificacion';

//Puentes
import axios from 'axios';

const InicioSesion: React.FC = () => {
    const [tag, setTag] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();



    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@mail\.[a-zA-Z]{2,}$/; // Formato: cualquier cosa@mail.xxxx
        return emailPattern.test(email);
    };

    
    const handleLogin = async () => {
        const userData = { correo: email, contraseña: password }; // Los datos que envías a la API
    
        // Validar el correo antes de hacer la solicitud
        if (!validateEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido con el formato @mail");
            return;
        }
    
        try {
            // Llamada a la API para realizar el login
            const response = await axios.post('http://localhost:3000/api/autentificacion/login', userData);
    
            // Si la respuesta es exitosa, puedes guardar el token en el localStorage
            if (response.status === 200) {
                console.log('Login exitoso', response.data);
                localStorage.setItem('token', response.data.token); // Guarda el token donde sea necesario
    
                // Redirigir al usuario a la página de inicio
                login();  // Si usas un hook de contexto para gestionar el estado de autenticación
                history.push('/home'); // Redirige a la página de inicio o la página que elijas
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
    
            // Si el error es una respuesta de error del backend
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);  // Muestra el mensaje de error que el backend devuelve
            } else {
                alert("Hubo un error al iniciar sesión. Por favor, inténtelo nuevamente.");
            }
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
                            <IonLabel position="stacked">Correo electronico</IonLabel>
                            <IonInput
                                placeholder='Ingrese su Correo electronico'
                                value={email}
                                onIonChange={e => setEmail(e.detail.value!)}
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
