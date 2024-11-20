import { Router } from 'express';
import * as comentarioController from '../controllers/comentarioController';

const router = Router();

// Rutas para manejar los comentarios
router.post('/comentarios', comentarioController.crearComentario);  // Crear comentario
router.get('/comentarios/cancion/:cancionId', comentarioController.obtenerComentariosPorCancion);  // Obtener comentarios por canción
router.get('/comentarios/usuario/:usuarioId', comentarioController.obtenerComentariosPorUsuario);  // Obtener comentarios por usuario
router.delete('/comentarios/:comentarioId', comentarioController.eliminarComentario);  // Eliminar comentario

export default router;
