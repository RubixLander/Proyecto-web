import express from 'express';
import { registrarUsuarioHandler, iniciarSesionHandler } from '../controllers/usuarioController';
import { verificarToken } from '../middlewares/authMiddleware';
import {
  crearUsuarioConPerfil,
  obtenerUsuarioConPerfil,
  actualizarUsuarioYPerfil,
  eliminarUsuarioYPerfil
} from '../controllers/usuarioController';

const router = express.Router();

// Registrar un nuevo usuario con perfil
router.post('/crear', crearUsuarioConPerfil);

// Obtener un usuario por tag y su perfil
router.get('/:tag', obtenerUsuarioConPerfil);

// Actualizar un usuario y su perfil (requiere autenticación)
router.put('/actualizar', verificarToken, actualizarUsuarioYPerfil);

// Eliminar un usuario y su perfil (requiere autenticación)
router.delete('/:tag', verificarToken, eliminarUsuarioYPerfil);

// Ruta para iniciar sesión (login)
router.post('/login', iniciarSesionHandler);

// Registrar un nuevo usuario (sin perfil)
router.post('/registro', registrarUsuarioHandler);

export default router;
