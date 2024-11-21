import axios from 'axios';

// Crear una instancia de axios con la URL base del backend para autenticación
const api = axios.create({
  baseURL: 'http://localhost:3000/api/routes/usuarios',  // URL base para el backend de usuarios
  headers: {
    'Content-Type': 'application/json',
  },
});

// Registrar un nuevo usuario con perfil
export const registerUserWithProfile = async (userData: { tag: string; nombre: string; contrasena: string; correo: string }) => {
  try {
    const response = await api.post('/crear', userData);
    return response.data;  // Devuelve la respuesta del backend
  } catch (error) {
    console.error('Error al registrar usuario con perfil', error);
    throw error;
  }
};


// Iniciar sesión (login)
export const loginUser = async (userData: { correo: string; contrasena: string }) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;  // Devuelve el token JWT y otros detalles
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    throw error;
  }
};

// Función para obtener un usuario por su tag
export const getUserByTag = async (tag) => {
  try {
    const response = await api.get(`/${tag}`); // Hacemos la solicitud GET con el tag
    return response.data;  // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    throw error; // Lanza el error para que el frontend lo pueda manejar
  }
};
