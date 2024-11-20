import { Router } from 'express';
import * as playlistController from '../controllers/playlistController';

const router = Router();

router.post('/crear', playlistController.crearPlaylist);
router.get('/:id', playlistController.obtenerPlaylist);
router.put('/actualizar/:id', playlistController.actualizarPlaylist);
router.delete('/:id', playlistController.eliminarPlaylist);

export default router;
