//Import de Elementos IONIC/REACT
import React, { useEffect, useState } from 'react';
import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonItem,IonLabel,IonInput,IonButton,IonText,IonImg,IonIcon} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settings } from 'ionicons/icons';

//Import de Componentes
import { InterfazGeneral } from '../components/Interfaces';

//Import de CSS
import './AjustePerfil.css';

//Puentes
import api from '../api/api';

const AjustePerfil: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [headerText, setHeaderText] = useState<string>('');
  const [informacion, setInformacion] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [profileImage, setProfileImage] = useState<string | null>(null); // Para la imagen de perfil
  const [imageUrl, setImageUrl] = useState<string>(''); // URL de la imagen de perfil (opcional para que el usuario ingrese una URL)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // Para la imagen de fondo
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(''); // URL de la imagen de fondo (opcional)

  const userTag = localStorage.getItem('userTag');
  const history = useHistory();

  // Efecto para obtener los datos del perfil
  useEffect(() => {
    const fetchUserProfile = async () => {
      
      if (!userTag) {
        console.error('El usuario no está autenticado');
        setError('No estás autenticado');
        setLoading(false);
        return;
      }

      const encodedUserTag = encodeURIComponent(userTag);
      try {
        const response = await api.get(`/perfil/obtener/${encodedUserTag}`);
        console.log('Datos del perfil:', response.data);

        setProfileData(response.data);
      } catch (err) {
        setError('Error al obtener el perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Cuando los datos del perfil cambian, actualiza los estados locales
  useEffect(() => {
    if (profileData) {
      setUsername(profileData.nombre || '');
      setHeaderText(profileData.headerText || '');
      setInformacion(profileData.informacion || '');
      setProfileImage(profileData.avatar || null);
      setBackgroundImage(profileData.background || null); 
    }
  }, [profileData]); // Este efecto se ejecuta cuando profileData cambia

  if (loading) {
    return <IonContent><div>Cargando...</div></IonContent>;
  }

  if (error) {
    return <IonContent><div>{error}</div></IonContent>;
  }

    // Manejo de cambio de imagen de perfil desde la URL
    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageUrl(e.target.value);
    };

  // Manejo de cambio de imagen de fondo desde la URL
  const handleBackgroundImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundImageUrl(e.target.value);
  };


  // Manejo de cambio de imagen de fondo desde el archivo
  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string); // Guarda la imagen de fondo en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejo de cambio de imagen de perfil
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

  const handleSave = async () => {
    try {
      const userTag = localStorage.getItem('userTag');
      const token = localStorage.getItem('token');

      console.log('Token:', token);
  
      if (!userTag || !token) {
        console.error('El usuario no está autenticado');
        return;
      }
  
      const encodedUserTag = encodeURIComponent(userTag);
  
      // Preparamos los datos que vamos a enviar al backend
      const data = {
        nombre: username,
        avatar: imageUrl || profileImage,
        headerText, // Este es el texto que se debe enviar
        background: backgroundImageUrl || backgroundImage,
        informacion, // Este es el texto adicional que se debe enviar
      };
  
      // Verifica que los datos no estén vacíos antes de enviar
      console.log('Datos a enviar al backend:', data);
  
      // Realiza la solicitud PUT para guardar los cambios
      const response = await api.put(
        `/perfil/modificar/${encodedUserTag}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Perfil actualizado con éxito');
        history.push(`/perfil/${userTag}`);
      } else {
        console.error('Error al actualizar el perfil:', response.data.message);
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
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
            {/* Campo para ingresar la URL de la imagen */}
            <IonItem>
              <IonLabel position="floating">URL de la Imagen</IonLabel>
              <IonInput
                value={imageUrl}
                onIonChange={handleImageUrlChange}
                placeholder="Pega la URL de tu imagen"
              />
            </IonItem>

            {/* Imagen de fondo */}
            <div className="background-image-container">
              {backgroundImage || backgroundImageUrl ? (
                <IonImg src={backgroundImageUrl || backgroundImage} className="background-image" />
              ) : (
                <div className="default-image">+</div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageChange}
              className="image-upload-button"
              style={{ display: 'none' }}
              id="file-upload-bg"
            />
            <label htmlFor="file-upload-bg" className="custom-upload-button">
              Cargar Imagen de Fondo
            </label>

            {/* Campo para ingresar la URL de la imagen de fondo */}
            <IonItem>
              <IonLabel position="floating">URL de la Imagen de Fondo</IonLabel>
              <IonInput
                value={backgroundImageUrl}
                onIonChange={handleBackgroundImageUrlChange}
                placeholder="Pega la URL de la imagen de fondo"
              />
            </IonItem>
          </div>


          <IonItem>
            <IonLabel position="floating">Nombre de Usuario</IonLabel>
            <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Texto introductorio</IonLabel>
            <IonInput value={headerText} onIonChange={(e) => setHeaderText(e.detail.value!)} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Información de perfil</IonLabel>
            <IonInput value={informacion} onIonChange={(e) => setInformacion(e.detail.value!)} />
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