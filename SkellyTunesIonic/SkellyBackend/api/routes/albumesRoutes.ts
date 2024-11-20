import { Router } from 'express';
import * as albumController from '../controllers/albumController';

const router = Router();

router.post('/crear', albumController.crearAlbum);
router.get('/:id', albumController.obtenerAlbum);
router.put('/actualizar/:id', albumController.actualizarAlbum);
router.delete('/:id', albumController.eliminarAlbum);

export default router;
