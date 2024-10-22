    import React, { useState } from 'react';
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
    import { BotonPeter } from '../components/Botones';
    import { useHistory } from 'react-router-dom';
    import { Link } from 'react-router-dom';
    import './Reginit.css';
    import { InterfazSimple } from '../components/Interfaces';
    import { useAuth } from '../contexts/autentificacion';

    //Estructura de json y registro
    const Registro: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@mail\.[a-zA-Z]{2,}$/; // Formato: cualquier cosa@mail.xxxx
        return emailPattern.test(email);
    };

    const handleRegister = () => {
        // Validar Email
        if (!validateEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido con el formato @mail");
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
    
        // Obtener datos existentes o crear un nuevo array
        const existingUsers = localStorage.getItem('users');
        const usersArray: User[] = existingUsers ? JSON.parse(existingUsers) : [];
    
        // Verificar si el usuario ya existe
        const userExists = usersArray.some(user => user.username === username);
        const emailExists = usersArray.some(user => user.email === email);
    
        if (userExists) {
            alert("Este nombre de usuario ya está registrado");
            return;
        }
    
        if (emailExists) {
            alert("Este correo electrónico ya está registrado");
            return;
        }
    
        // Almacenar datos en el array
        const userData: User = { username, email, password };
        usersArray.push(userData);
    
        // Guardar el nuevo array en localStorage
        localStorage.setItem('users', JSON.stringify(usersArray));

        login();
        
        // Redirigir a la página de inicio
        history.push('/home');
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
            <BotonPeter onClick={handleRegister} className="menuOpciones" expand= "full" text= "Registrarse"/>
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
