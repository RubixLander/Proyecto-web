import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonThumbnail,
} from '@ionic/react';
import './Chat.css';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ user: string; text: string; avatar: string }[]>([
    { user: '@telepath0s', text: 'so gloomy...', avatar: "https://i.scdn.co/image/ab67616d0000b273c05caac7ec59550bb4e204ca" },
    { user: '@quentin.blaze', text: "One of dds's best releases, they seemingly took the best qualities of every project before this and put it into one fantastic album.", avatar: 'https://f4.bcbits.com/img/0035576745_42.jpg' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: '@minimo', text: message, avatar: 'https://f4.bcbits.com/img/0033779152_10.jpg' }]);
      setMessage('');
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Comentarios</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="chat-input-container">
          <IonInput
            value={message}
            onIonChange={(e) => setMessage(e.detail.value!)}
            placeholder="Escribe lo que piensas..."
            className="chat-input"
          />
          <IonButton onClick={sendMessage} className="chat-send-button">
            Enviar
          </IonButton>
        </div>
        <IonList className="chat-messages">
          {messages.map((msg, index) => (
            <IonItem key={index} className="chat-message">
              <IonThumbnail slot="start">
                <img
                  alt="Avatar"
                  src={msg.avatar} // Usar la URL del avatar del mensaje
                />
              </IonThumbnail>
              <IonLabel>
                <div className="chat-user">{msg.user}</div>
                <div className="chat-text">{msg.text}</div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Chat;
