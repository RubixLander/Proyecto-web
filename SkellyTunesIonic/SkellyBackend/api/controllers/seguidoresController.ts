import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import SeguidosUsuarios from '../models/SeguidosUsuarios';

// Seguir a un usuario
export const seguirUsuario = async (req: Request, res: Response) => {
  const { seguidor_tag, seguido_tag } = req.body;

  try {
    // Verificar si el usuario que sigue y el seguido existen
    const seguidor = await Usuario.findByPk(seguidor_tag);
    const seguido = await Usuario.findByPk(seguido_tag);

    if (!seguidor || !seguido) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear la relación de seguimiento
    await SeguidosUsuarios.create({ seguidor_tag, seguido_tag });

    return res.status(200).json({ message: `Usuario ${seguidor_tag} ahora sigue a ${seguido_tag}` });
  } catch (error) {
    console.error('Error al seguir al usuario:', error);
    return res.status(500).json({ message: 'Error al seguir al usuario' });
  }
};

// Dejar de seguir a un usuario
export const dejarDeSeguir = async (req: Request, res: Response) => {
  const { seguidor_tag, seguido_tag } = req.body;

  try {
    // Eliminar la relación de seguimiento
    await SeguidosUsuarios.destroy({
      where: {
        seguidor_tag,
        seguido_tag,
      },
    });

    return res.status(200).json({ message: `Usuario ${seguidor_tag} ha dejado de seguir a ${seguido_tag}` });
  } catch (error) {
    console.error('Error al dejar de seguir al usuario:', error);
    return res.status(500).json({ message: 'Error al dejar de seguir al usuario' });
  }
};

// Obtener los seguidores de un usuario
export const obtenerSeguidores = async (req: Request, res: Response) => {
  const { tag } = req.params;

  try {
    // Obtener los seguidores del usuario
    const seguidores = await Usuario.findAll({
      include: {
        model: Usuario,
        as: 'Seguidores', // Relación que definimos con alias
        where: { '$Seguidores.seguido_tag$': tag }, // Filtrar por tag
      },
    });

    return res.status(200).json(seguidores);
  } catch (error) {
    console.error('Error al obtener los seguidores:', error);
    return res.status(500).json({ message: 'Error al obtener los seguidores' });
  }
};

// Obtener los usuarios seguidos por un usuario
export const obtenerSeguidos = async (req: Request, res: Response) => {
  const { tag } = req.params;

  try {
    // Obtener los usuarios seguidos
    const seguidos = await Usuario.findAll({
      include: {
        model: Usuario,
        as: 'Seguidos', // Relación que definimos con alias
        where: { '$Seguidos.seguidor_tag$': tag }, // Filtrar por tag
      },
    });

    return res.status(200).json(seguidos);
  } catch (error) {
    console.error('Error al obtener los seguidos:', error);
    return res.status(500).json({ message: 'Error al obtener los seguidos' });
  }
};
