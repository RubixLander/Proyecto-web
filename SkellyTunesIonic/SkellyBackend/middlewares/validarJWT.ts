import "../types/express.d"; 

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware para verificar el JWT
export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // No usamos `return` aquí, solo enviamos la respuesta
    res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    return;  // Esta línea es opcional pero puede ayudar a evitar errores de ejecución posterior
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;  // Guardamos el usuario decodificado en la request
    next();  // Continuamos con la siguiente función
  } catch (error) {
    // Si el token es inválido, enviamos una respuesta con error sin `return`
    res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};

// Middleware para verificar si el usuario es admin
export const esAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Verificamos si el usuario tiene el rol de 'admin'
  if (req.user?.rol !== 'admin') {
    // Enviamos el error de acceso denegado sin usar `return`
    res.status(403).json({ error: 'Acceso denegado. No eres administrador.' });
    return;  // Esta línea es opcional
  }
  next();  // Si es admin, pasamos al siguiente middleware o controlador
};
