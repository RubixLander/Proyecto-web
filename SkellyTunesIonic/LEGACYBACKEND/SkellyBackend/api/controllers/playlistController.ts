import { Request, Response } from 'express';
import Playlist from '../models/Playlist';
import Cancion from '../models/Cancion';
import asyncHandler from '../utils/asyncHandler';

// Crear una playlist
export const crearPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const { titulo, detalle, creador, canciones } = req.body;

  if (!titulo || !creador) {
    res.status(400).json({ error: 'Campos incompletos' });
    return;
  }

  const nuevaPlaylist = await Playlist.create({ titulo, detalle, creador });

  if (canciones && canciones.length > 0) {
    const cancionesEncontradas = await Cancion.findAll({ where: { id: canciones } });
    await nuevaPlaylist.setCanciones(cancionesEncontradas);
  }

  res.status(201).json(nuevaPlaylist);
});

// Obtener una playlist por ID
export const obtenerPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const playlist = await Playlist.findByPk(req.params.id, { include: { model: Cancion } });

  if (!playlist) {
    res.status(404).json({ error: 'Playlist no encontrada' });
    return;
  }

  res.status(200).json(playlist);
});

// Actualizar una playlist
export const actualizarPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const { titulo, detalle, creador, canciones } = req.body;
  const playlist = await Playlist.findByPk(req.params.id);

  if (!playlist) {
    res.status(404).json({ error: 'Playlist no encontrada' });
    return;
  }

  await playlist.update({ titulo, detalle, creador });

  if (canciones && canciones.length > 0) {
    const cancionesEncontradas = await Cancion.findAll({ where: { id: canciones } });
    await playlist.setCanciones(cancionesEncontradas);
  }

  res.status(200).json(playlist);
});

// Eliminar una playlist
export const eliminarPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const playlist = await Playlist.findByPk(req.params.id);

  if (!playlist) {
    res.status(404).json({ error: 'Playlist no encontrada' });
    return;
  }

  await playlist.destroy();
  res.status(204).json();
});
