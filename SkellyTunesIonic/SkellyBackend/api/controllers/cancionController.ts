import { Request, Response } from 'express';
import Cancion from '../models/Cancion';
import Genero from '../models/Genero';
import asyncHandler from '../utils/asyncHandler'; // Suponiendo que asyncHandler está en utils

// Crear una canción
export const crearCancion = asyncHandler(async (req: Request, res: Response) => {
  const { track, titulo, duracion, album, generos } = req.body;

  if (!track || !titulo || !duracion) {
    res.status(400).json({ error: 'Campos incompletos' });
    return;
  }

  const nuevaCancion = await Cancion.create({ track, titulo, duracion, album });

  if (generos && generos.length > 0) {
    const generosEncontrados = await Genero.findAll({ where: { id: generos } });
    await nuevaCancion.setGeneros(generosEncontrados);
  }

  res.status(201).json(nuevaCancion);
});

// Obtener una canción por ID
export const obtenerCancion = asyncHandler(async (req: Request, res: Response) => {
  const cancion = await Cancion.findByPk(req.params.id, { include: { model: Genero } });

  if (!cancion) {
    res.status(404).json({ error: 'Canción no encontrada' });
    return;
  }

  res.status(200).json(cancion);
});

// Actualizar una canción
export const actualizarCancion = asyncHandler(async (req: Request, res: Response) => {
  const { track, titulo, duracion, album, generos } = req.body;
  const cancion = await Cancion.findByPk(req.params.id);

  if (!cancion) {
    res.status(404).json({ error: 'Canción no encontrada' });
    return;
  }

  await cancion.update({ track, titulo, duracion, album });

  if (generos && generos.length > 0) {
    const generosEncontrados = await Genero.findAll({ where: { id: generos } });
    await cancion.setGeneros(generosEncontrados);
  }

  res.status(200).json(cancion);
});

// Eliminar una canción
export const eliminarCancion = asyncHandler(async (req: Request, res: Response) => {
  const cancion = await Cancion.findByPk(req.params.id);

  if (!cancion) {
    res.status(404).json({ error: 'Canción no encontrada' });
    return;
  }

  await cancion.destroy();
  res.status(204).json();
});
