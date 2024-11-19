import "../types/express.d"; 

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;  // Almacenar el usuario decodificado en el request
    next();  // Continuar con la siguiente función en la cadena
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};

// Middleware para verificar si el usuario tiene permisos de admin
export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Usuario no autorizado.' });
  }
  next();  // El usuario es admin, continuar con la siguiente función
};
