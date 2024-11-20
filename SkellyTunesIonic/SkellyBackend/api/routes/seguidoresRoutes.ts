import express from 'express';
import { seguirUsuario, dejarDeSeguir, obtenerSeguidores, obtenerSeguidos } from '../controllers/seguidoresController';

const router = express.Router();

// Rutas para seguir y dejar de seguir a un usuario
router.post('/seguir', async (req, res) => {
  try {
    await seguirUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error al seguir al usuario', error });
  }
});

router.delete('/dejar-de-seguir', async (req, res) => {
  try {
    await dejarDeSeguir(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error al dejar de seguir al usuario', error });
  }
});

// Rutas para obtener seguidores y seguidos de un usuario
router.get('/:tag/seguidores', async (req, res) => {
  try {
    await obtenerSeguidores(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los seguidores', error });
  }
});

router.get('/:tag/seguidos', async (req, res) => {
  try {
    await obtenerSeguidos(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los seguidos', error });
  }
});

export default router;
