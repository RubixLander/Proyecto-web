import "../types/express.d"; 

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

// Middleware para verificar el JWT
export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};

// Middleware para verificar si el usuario es admin
export const esAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.rol !== 'admin') {
    res.status(403).json({ error: 'Acceso denegado. No eres administrador.' });
    return;
  }
  next();
};

// Exportamos el router
export default router;  // Aquí estamos exportando el router por defecto