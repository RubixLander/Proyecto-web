import { Router } from 'express';
import * as cancionController from '../controllers/cancionController';

const router = Router();

router.post('/crear', cancionController.crearCancion);
router.get('/:id', cancionController.obtenerCancion);
router.put('/actualizar/:id', cancionController.actualizarCancion);
router.delete('/:id', cancionController.eliminarCancion);

export default router;
