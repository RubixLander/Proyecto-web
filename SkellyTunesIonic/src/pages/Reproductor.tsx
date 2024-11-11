import { IonPage, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonImg, IonProgressBar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/react';
import { thumbsUp, thumbsDown, playSkipBack, pause, playSkipForward, add } from 'ionicons/icons';
import './Reproductor.css';
import { InterfazGeneral } from '../components/Interfaces';

const Reproductor: React.FC = () => {
  return (
    <IonPage>
        <InterfazGeneral>
      {/* Cabecera y barra de navegación */}


      {/* Contenido principal */}
      <IonContent className="ion-padding">
      <div className="album-container-reproductor">
    <div className="album-image-container-reproductor">
        <IonImg src="https://f4.bcbits.com/img/a0972302045_16.jpg" alt="Portada del Álbum" />
    </div>

    <div className="album-info-reproductor">
        <h1>Fenix</h1>
        <h3>Cul de Sac</h3>
        <IonButton color="dark">
            <IonIcon icon={add}></IonIcon> Añadir a Lista
        </IonButton>
    </div>



    {/* Barra de progreso */}
    <IonProgressBar className="progress-container" value={0.5}></IonProgressBar>
</div>
        {/* Controles del reproductor */}
        <div className="repr-controls-reproductor">
          <IonButton color="success">
            <IonIcon icon={thumbsUp}></IonIcon>
          </IonButton>

          <IonButton color="dark">
            <IonIcon icon={playSkipBack}></IonIcon>
          </IonButton>

          <IonButton color="dark">
            <IonIcon icon={pause}></IonIcon>
          </IonButton>

          <IonButton color="dark">
            <IonIcon icon={playSkipForward}></IonIcon>
          </IonButton>

          <IonButton color="danger">
            <IonIcon icon={thumbsDown}></IonIcon>
          </IonButton>
        </div>

        {/* Lista de canciones */}
        <IonAccordionGroup>
          <IonAccordion>
            <IonItem slot="header" color="light">
              <IonLabel>Lista de Canciones</IonLabel>
            </IonItem>
            <div slot="content">
              <div className="song-item-reproductor">
                <span>1. Cul de Sac</span>
                <span>02:34</span>
              </div>
              <div className="song-item-reproductor">
                <span>2. Fenix</span>
                <span>02:37</span>
              </div>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        {/* Sección de comentarios */}
        <div className="comment-section-reproductor">
          <h5>Comentarios</h5>
          <div className="comment-reproductor">
            <IonImg src="https://static.wikia.nocookie.net/punpun/images/1/15/Punpun_c1p2.PNG" alt="Foto de usuario" />
            <div className="comment-content">
              <strong>@tele.path0s:</strong> ¡Gran álbum!
            </div>
          </div>

          {/* Añadir comentario */}
          <div className="add-comment-reproductor">
            <IonImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEAmF8HZle9Lst9fguK1vC-1GoF9fIWXu7Q&s" alt="Foto de usuario" />
            <IonTextarea placeholder="Escribe tu comentario..."></IonTextarea>
            <IonButton color="primary">Publicar</IonButton>
          </div>
        </div>
      </IonContent>
      </InterfazGeneral>
    </IonPage>
  );
};

export default Reproductor;
