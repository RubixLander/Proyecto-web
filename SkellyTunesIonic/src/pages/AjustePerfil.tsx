import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonText, IonImg, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settings} from 'ionicons/icons';
import './AjustePerfil.css';
import {InterfazGeneral} from '../components/Interfaces';

interface User {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

const AjustePerfil: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const existingUsers = localStorage.getItem('users');
    if (existingUsers) {
      const usersArray: User[] = JSON.parse(existingUsers);
      const loggedUser = usersArray[0]; // Cambia esto según tu lógica
      setUsername(loggedUser.username);
      setEmail(loggedUser.email);
      setProfileImage(loggedUser.profileImage || null);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@mail\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Por favor, ingrese un correo electrónico válido con el formato @mail");
      return;
    }

    const existingUsers = localStorage.getItem('users');
    const usersArray: User[] = existingUsers ? JSON.parse(existingUsers) : [];

    const updatedUser: User = { username, email, password: usersArray[0].password, profileImage };
    usersArray[0] = updatedUser;

    localStorage.setItem('users', JSON.stringify(usersArray));
    history.push('/perfil');
  };

  return (
    <IonPage>
      <InterfazGeneral>
      <IonHeader>
                    <IonToolbar className="custom-header">
                        <div className="custom-header-contenido">
                            <IonIcon icon={settings} className="custom-header-icono" />
                            <IonTitle className="custom-header-titulo">Ajustes</IonTitle>
                        </div>
                    </IonToolbar>
                </IonHeader>
      <IonContent>
        <div className="image-container">
          <div className="profile-image-container">
            {profileImage ? (
              <IonImg src={profileImage} className="profile-image" />
            ) : (
              <div className="default-image">+</div>
            )}
          </div>
          {/* Botón para cargar la imagen justo debajo del círculo */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="image-upload-button" 
            style={{ display: 'none' }} 
            id="file-upload" 
          />
          <label htmlFor="file-upload" className="custom-upload-button">
            Cargar Imagen
          </label>
        </div>
        <IonItem>
          <IonLabel position="floating">Nombre de Usuario</IonLabel>
          <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonButton expand="full" onClick={handleSave}>
          Guardar Cambios
        </IonButton>
        <IonText>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p>Los cambios se guardarán al hacer clic en "Guardar Cambios".</p>
          </div>
        </IonText>
      </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default AjustePerfil;