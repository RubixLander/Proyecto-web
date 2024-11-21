//Import de Elementos IONIC/REACT
import React, { useState } from 'react';
import { IonPage, IonHeader, IonContent, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { useHistory,Link } from 'react-router-dom';

//Import componentes
import { BotonPeter } from '../components/Botones';
import { InterfazSimple } from '../components/Interfaces';
    
//Import de css
import './Reginit.css';
    
//Import de contexto
import { useAuth } from '../contexts/autentificacion';

//Puentes
import axios from 'axios';

const Registro: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [tag, setTag] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@mail\.[a-zA-Z]{2,}$/; // Formato: cualquier cosa@mail.xxxx
        return emailPattern.test(email);
    };

    const validateTag = (tag: string) => {
        // Expresión regular para validar el 'tag' en formato '@nombre'
        const tagPattern = /^@[a-zA-Z0-9-_]{3,20}$/;
        return tagPattern.test(tag);
    };
    

    const handleRegister = async () => {
        // Validar Email
        if (!validateEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido con el formato @mail");
            return;
        }
    
        // Validar Tag (Formato: @nombre)
        if (!validateTag(tag)) {
            alert("El tag debe comenzar con '@' seguido de 3 a 20 caracteres alfanuméricos, guiones o guiones bajos.");
            return;
        }
    
        // Validar contraseñas
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
    
        // Validar que todos los campos se rellenen
        if (!username || !email || !password || !confirmPassword) {
            alert("Se necesita rellenar todos los campos");
            return;
        }
    
        try {
            // Crear un objeto con los datos del usuario
            const userData = { 
                tag: tag, 
                nombre: username, 
                contraseña: password, 
                correo: email, 
                informacion: "No he escrito nada aun!", 
                avatar: "https://media.istockphoto.com/id/1818754016/vector/skull-human-skeleton-silhouette-human-skeleton-head-side-view-human-body-structure-anatomy-x.jpg?s=612x612&w=0&k=20&c=KgdJFMcH-k67VSjpb6KK_rNA_NPni4Bq6PlligzATcc=", 
                background: "https://everwallpaper.com/cdn/shop/products/skeleton-art-wall-mural.jpg?v=1650356286&width=533", 
                headertext: "Bone-chilling!"
            };
    
            // Realizar la solicitud POST con Axios
            const response = await axios.post('http://localhost:3000/api/autentificacion/registro', userData); // Realiza la petición directamente a la API
    
            if (response.status === 201) {
                alert(response.data.message || "Usuario registrado exitosamente!");  // Mostrar mensaje de éxito
                login();  // Cambiar el contexto de autenticación
                history.push('/home');  // Redirigir al inicio
            } else {
                // Mostrar el mensaje de error del backend (por ejemplo, 'correo ya registrado')
                alert(response.data.error || "Error al registrar el usuario, por favor intenta de nuevo");
            }
        } catch (error) {
            // Manejo de errores: mostrar el mensaje de error desde el backend, si existe
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error); // Mostrar el error del backend
            } else {
                alert('Error al registrar el usuario, por favor intenta de nuevo'); // Mensaje genérico si no hay error específico
            }
            console.error("Error en el registro:", error); // Para depuración
        }
    };
    
    
    return (
        <IonPage>
        <InterfazSimple>
        <IonHeader>
        </IonHeader>
        <IonContent>
            <div className="registro-container">
                <div className ="rigin-box">
                <IonList className='asd'>
                <IonItem>
                    <IonLabel position="stacked">Nombre De Usuario</IonLabel>
                    <IonInput
                    placeholder='Example: SilksongClown44'
                    value={username}
                    onIonChange={e => setUsername(e.detail.value!)}
                    type="text"
                    required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Tag</IonLabel>
                    <IonInput
                    placeholder='@skelly'
                    value={tag}
                    onIonChange={e => setTag(e.detail.value!)}
                    type="text"
                    required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                    placeholder='clown@mail.com'
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                    type="email"
                    required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput
                    placeholder='clowntraseña44'
                    value={password}
                    onIonChange={e => setPassword(e.detail.value!)}
                    type="password"
                    required
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Confirmar contraseña</IonLabel>
                    <IonInput
                    placeholder='clowntraseña44'
                    value={confirmPassword}
                    onIonChange={e => setConfirmPassword(e.detail.value!)}
                    type="password"
                    required
                    />
                </IonItem>
            </IonList>
            <BotonPeter onClick={handleRegister} className="menuOpciones" expand="full" text="Registrarse"/>
            <IonText>
                <div style={{textAlign:'center', margin:'20px 0', color: 'white'}}>
                    <p>¿Ya tienes cuenta?</p>
                    <Link to="/inicioSesion" style={{ textDecoration: 'underline', color: 'white' }}>
                         Inicia sesión aquí
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

export default Registro;

