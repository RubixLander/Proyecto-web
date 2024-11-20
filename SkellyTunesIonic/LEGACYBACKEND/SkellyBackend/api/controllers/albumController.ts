import { Request, Response } from 'express';
import Album from '../models/Album';
import asyncHandler from '../utils/asyncHandler';

// Crear un álbum
export const crearAlbum = asyncHandler(async (req: Request, res: Response) => {
  const { titulo, artista, fechaLanzamiento, generos } = req.body;

  if (!titulo || !artista || !fechaLanzamiento) {
    res.status(400).json({ error: 'Campos incompletos' });
    return;
  }

  const nuevoAlbum = await Album.create({ titulo, artista, fechaLanzamiento });

  res.status(201).json(nuevoAlbum);
});

// Obtener un álbum por ID
export const obtenerAlbum = asyncHandler(async (req: Request, res: Response) => {
  const album = await Album.findByPk(req.params.id);

  if (!album) {
    res.status(404).json({ error: 'Álbum no encontrado' });
    return;
  }

  res.status(200).json(album);
});

// Actualizar un álbum
export const actualizarAlbum = asyncHandler(async (req: Request, res: Response) => {
  const { titulo, artista, fechaLanzamiento } = req.body;
  const album = await Album.findByPk(req.params.id);

  if (!album) {
    res.status(404).json({ error: 'Álbum no encontrado' });
    return;
  }

  await album.update({ titulo, artista, fechaLanzamiento });
  res.status(200).json(album);
});

// Eliminar un álbum
export const eliminarAlbum = asyncHandler(async (req: Request, res: Response) => {
  const album = await Album.findByPk(req.params.id);

  if (!album) {
    res.status(404).json({ error: 'Álbum no encontrado' });
    return;
  }

  await album.destroy();
  res.status(204).json();
});
