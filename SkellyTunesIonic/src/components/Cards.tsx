//Import de Elementos IONIC/REACT
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel, IonButton,IonBadge, IonIcon } from '@ionic/react';
import { IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import { musicalNotes, thumbsUp, chatbubble, thumbsDown, play,shareSocial } from 'ionicons/icons'; 
import { people, chatbubbles } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


//Import de CSS
import './Cards.css'; 


interface DiscussionCardProps {
  communityName: string;
  communityImage?: string;
  title: string;
  subtitle: string;
  content: string;
  inCommunity?: boolean; // Prop booleana

}

interface TrackCardProps {
  image?: string;
  title: string; // Nombre de la canción
  subtitle: string; // Álbum
  artist?: string; // Nombre del artista (opcional)
  content?: string; // Contenido adicional (opcional)
  duration?: string; // Duración de la canción
  icon?: string; // Icono (opcional)
  topImage?: string; // Imagen superior (opcional)
  route?: string; // Ruta de navegación (opcional)
}


//Contenido de card.
interface CardProps {
  image?: string;
  title?: string; 
  subtitle?: string; 
  content?: string;
  icon?: string;
  topImage?: string;
  route?: string; 
}

interface CardListProps {
  items: Array<{ id: number; label: string; imageUrl: string }>;
}

export const AlbumCard: React.FC<CardProps> = ({ image, title, subtitle, content, icon, route }) => {
  const history = useHistory();
  // Lógica de redireccionado
  const handleClick = () => {
      if (route) {
          history.push(route);
      }
  };
  return (
    <IonCard button={true} className="AlbumCard" onClick={handleClick}>
      <div className="album-image-container">
        <img alt={title} src={image} className="album-image" />
        {icon && <IonIcon icon={icon} className="overlay-icon" />}
      </div>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {content}
      </IonCardContent>
    </IonCard>
  );
}

export const UserCard: React.FC<CardProps> = ({ image, title, subtitle, content,route }) => {
  const history = useHistory();
  // Lógica de redireccionado
  const handleClick = () => {
      if (route) {
          history.push(route);
      }
  };
  return (
    <IonCard button={true} className="UserCard" onClick={handleClick}>
      <div className="user-image-container">
        <img alt={title} src={image} className="user-image" />
      </div>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {content}
        <IonButton  color="dark" size='small'     onClick={(e) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al IonCard
        // Aquí puedes agregar la lógica de seguir si la necesitas
    }}>Seguir</IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export const CommunityCard: React.FC<CardProps> = ({ image, title, topImage, route }) => {
  const history = useHistory();
  // Lógica de redireccionado
  const handleClick = () => {
      if (route) {
          history.push(route);
      }
  };
  return (
    <IonCard className="community-card" button={true} onClick={handleClick}>
      {/* Imagen superior con tamaño fijo */}
      {topImage && <img src={topImage} alt={title} className="top-image" />}
      
      {/* Línea de imagen como fondo */}
      <div className="image-line" style={{ backgroundImage: `url(${image})` }} />
      
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonButton
    size="small"
    color="dark"
    onClick={(e) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al IonCard
        // Aquí puedes agregar la lógica de seguir si la necesitas
    }}
>
    Unirse
</IonButton>
      </IonCardHeader>
      <IonCardContent>
        {/* Fila con íconos y texto */}
        <IonRow className="member-discussion-row" style={{ textAlign: 'center', margin: '10px 0' }}>
          <IonCol>
            <IonIcon icon={people} /> {/* Ícono de miembros */}
            <span>10</span>
          </IonCol>
          <IonCol>
            <IonIcon icon={chatbubbles} /> {/* Ícono de discusiones */}
            <span>10</span>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};


export const PlaylistCard: React.FC<CardProps> = ({ title, subtitle, content, image }) => {
  return (
    <IonCard button={true} className="playlist-card">
      <IonGrid>
        <IonRow>
          {image && (
            <IonCol size="4" style={{ display: 'flex' }}>
    <div className="image-container">
        <IonImg src={image} className="playlist-square-image" />
    </div>
</IonCol>
          )}
          <IonCol>
            <div className="playlist-content-container">
              <div className="playlist-title-container">
                <div>
                  <IonCardHeader>
                    <IonCardTitle>{title}</IonCardTitle>
                    <IonCardSubtitle>{subtitle}</IonCardSubtitle>
                  </IonCardHeader>
                </div>
              </div>
              <IonCardContent>
                <div>{content}</div>
              </IonCardContent>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="playlist-badge-container">
        <IonBadge className="playlist-custom-badge" color="primary">
          <IonIcon icon={musicalNotes} color="light" className="playlist-badge-icon" /> 
          12
        </IonBadge>
      </div>
    </IonCard>
  );
};
export const TrackCard: React.FC<TrackCardProps> = ({ title, subtitle, artist, content, image, duration }) => {
  return (
    <IonCard button={true} className="track-card">
      <IonGrid>
        <IonRow>
          {image && (
            <IonCol size="4" style={{ padding: 0 }}>
              <div className="image-container">
                <IonImg src={image} className="track-square-image" />
              </div>
            </IonCol>
          )}
          <IonCol size="8">
            <div className="track-content-container">
              <div className="track-title-container">
                <IonButton fill="clear" style={{ marginRight: '8px', padding: '0' }}>
                  <IonIcon icon={play} />
                </IonButton>
                <IonCardTitle style={{ margin: 0 }}>{title}</IonCardTitle>
              </div>
              <IonCardHeader style={{ padding: 0 }}>
                {artist && <IonCardSubtitle>{artist}</IonCardSubtitle>} {/* Artista aquí */}
                <IonCardSubtitle>{subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{content}</div>
                {duration && <div className="track-duration">{duration}</div>} {/* Duración como badge */}
              </IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                <IonButton fill="clear" size="small" style={{ marginRight: '8px' }}>
                  <IonIcon icon={thumbsUp} />
                  0
                </IonButton>
                <IonButton fill="clear" size="small" style={{ marginRight: '8px' }}>
                  <IonIcon icon={thumbsDown} />
                  0
                </IonButton>
                <IonButton fill="clear" size="small">
                  <IonIcon icon={shareSocial} />
                  Compartir
                </IonButton>
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};








export const CardList: React.FC<CardListProps> = ({ items }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {items.map(item => (
            <IonItem key={item.id}>
              <IonThumbnail slot="start">
                <img alt="Thumbnail" src={item.imageUrl} />
              </IonThumbnail>
              <IonLabel>{item.label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  communityName,
  communityImage,
  title,
  subtitle,
  content,
  inCommunity
}) => {
  return (
    <IonCard className="discussion-card" button={true}>
      <IonCardHeader>
        {/* Encabezado con imagen y nombre de la comunidad */}
        <div className="disussion-card-header">
          {communityImage && (
            <div className={`disussion-card-image ${inCommunity ? 'in-community' : ''}`}>
            <img 
              src={communityImage} 
              alt="Community Logo" 
            />
          </div>
          )}
          <span>{communityName}</span>
        </div>
        {/* Línea separadora */}
        <div className="disussion-card-separator" />
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{content}</p>
        <div className="disussion-card-content">
          <IonButton color="medium" fill="clear" style={{ marginRight: '5px' }}>
            <IonIcon slot="start" icon={thumbsUp} />
            0
          </IonButton>
          <IonButton color="medium" fill="clear" style={{ marginRight: '5px' }}>
            <IonIcon slot="start" icon={thumbsDown} />
            0
          </IonButton>
          <IonButton color="medium" fill="clear">
            <IonIcon slot="start" icon={chatbubble} />
            Respuestas
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};