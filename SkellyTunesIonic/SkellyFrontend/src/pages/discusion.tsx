//Import de Elementos IONIC/REACT
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonList, IonItem, IonLabel, IonText, IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { chatbubbles} from 'ionicons/icons';

//Import de Componentes
import {InterfazGeneral} from '../components/Interfaces';
import { AlbumCard, PlaylistCard, UserCard,TrackCard } from '../components/Cards';
import TabsNavegacion from '../components/Tabs'
import { LikeDislikeButtons } from '../components/Botones';
import { DiscussionCard } from '../components/Cards';
import { BotonGeneral } from '../components/Botones';

//Import de CSS
import './discusion.css'; 

interface Comment {
    id: number;
    author: string;
    content: string;
  }

const Discusion: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([
      { id: 1, author: "Juan", content: "React es definitivamente el mejor!" },
      { id: 2, author: "Maria", content: "Angular es más estructurado, pero React tiene más flexibilidad." },
    ]);
    const [newComment, setNewComment] = useState<string>('');
  
    const handleAddComment = () => {
      if (newComment.trim()) {
        setComments([
          ...comments,
          { id: comments.length + 1, author: "Nuevo Usuario", content: newComment }
        ]);
        setNewComment(''); // Limpiar campo de texto
      }
    };
  
    return (
      <IonPage>
        <InterfazGeneral>
          <IonHeader>
            <IonToolbar className="custom-header">
              <div className="custom-header-contenido">
                <IonIcon icon={chatbubbles} className="custom-header-icono" />
                <IonTitle className="custom-header-titulo">Discusión</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {/* Esto es un comentario de una sola línea */}
            <div className="discusion-cabecera">
  <img 
    className="discusion-cabecera-foto" 
    src="https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs=" 
    alt="Imagen de discusión"
  />
  <div className="discusion-cabecera-info">
    <h1>Los payasos de micro</h1>
  </div>
</div>



            <div className="discussion-detail">
          <IonText color="medium">
          <img alt="creador-discusion-avatar" src="https://f4.bcbits.com/img/0033779152_21.jpg" />
          <p>nombre</p>
          <p>@tag</p>
            <h2>Discusión sobre React vs Angular</h2>
            <p>En esta discusión hablamos sobre los pros y contras de cada framework para frontend.</p>
          </IonText>

          <IonList>
            {comments.map((comment) => (
              <IonItem key={comment.id}>
                <IonLabel>
                  <h3>{comment.author}</h3>
                  <p>{comment.content}</p>
                  <LikeDislikeButtons/>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

          <div className="add-comment">
            <IonInput
              value={newComment}
              onIonChange={(e) => setNewComment(e.detail.value!)}
              placeholder="Escribe tu respuesta"
            />
            <IonButton onClick={handleAddComment}>Añadir Respuesta</IonButton>
          </div>
        </div>
            
          </IonContent>
        </InterfazGeneral>
      </IonPage>
    );
  };
  
  export default Discusion;