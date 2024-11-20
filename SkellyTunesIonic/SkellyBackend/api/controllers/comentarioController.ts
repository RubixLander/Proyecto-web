import { Request, Response } from 'express';
import Comentario from '../models/Comentario';
import Cancion from '../models/Cancion';
import Usuario from '../models/Usuario';

// Crear un comentario
export const crearComentario = async (req: Request, res: Response) => {
  try {
    const { comentario, usuarioId, cancionId } = req.body;

    // Verificar que la canción y el usuario existan
    const cancion = await Cancion.findByPk(cancionId);
    const usuario = await Usuario.findByPk(usuarioId);

    if (!cancion || !usuario) {
      res.status(400).json({ message: 'Canción o usuario no encontrados.' });
      return;  // Aquí seguimos usando return solo para evitar que el flujo continúe
    }

    // Crear el comentario
    await Comentario.create({
      comentario,
      usuario: usuarioId,
      cancion: cancionId,
    });

    // Enviar respuesta sin usar return
    res.status(201).json({ message: 'Comentario creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ message: 'Error en el servidor al crear el comentario.' });
  }
};

// Obtener comentarios por canción
export const obtenerComentariosPorCancion = async (req: Request, res: Response) => {
  try {
    const { cancionId } = req.params;

    // Obtener los comentarios asociados a una canción
    const comentarios = await Comentario.findAll({
      where: { cancion: cancionId },
      include: [{ model: Usuario, attributes: ['id', 'nombre'] }]  // Incluir datos del usuario
    });

    if (!comentarios.length) {
      res.status(404).json({ message: 'No se encontraron comentarios para esta canción.' });
      return;
    }

    // Enviar los comentarios encontrados
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener los comentarios por canción:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener los comentarios.' });
  }
};

// Obtener comentarios por usuario
export const obtenerComentariosPorUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    // Obtener los comentarios asociados a un usuario
    const comentarios = await Comentario.findAll({
      where: { usuario: usuarioId },
      include: [{ model: Cancion, attributes: ['id', 'titulo'] }]  // Incluir datos de la canción
    });

    if (!comentarios.length) {
      res.status(404).json({ message: 'No se encontraron comentarios para este usuario.' });
      return;
    }

    // Enviar los comentarios encontrados
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener los comentarios por usuario:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener los comentarios.' });
  }
};

// Eliminar un comentario
export const eliminarComentario = async (req: Request, res: Response) => {
  try {
    const { comentarioId } = req.params;

    // Buscar el comentario a eliminar
    const comentario = await Comentario.findByPk(comentarioId);

    if (!comentario) {
      res.status(404).json({ message: 'Comentario no encontrado.' });
      return;
    }

    // Eliminar el comentario
    await comentario.destroy();
    res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).json({ message: 'Error en el servidor al eliminar el comentario.' });
  }
};
