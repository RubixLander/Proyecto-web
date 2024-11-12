import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/autentificacion';
import { EventProvider } from './contexts/eventoespecial';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <EventProvider>
      <App />
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);