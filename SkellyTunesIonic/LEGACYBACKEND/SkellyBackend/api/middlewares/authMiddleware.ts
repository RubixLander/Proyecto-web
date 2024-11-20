import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Enviar el error si no hay token
    res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    return;  // Para evitar que se siga ejecutando el código si no hay token
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;  // Almacenar el usuario decodificado en `req.user`
    next();  // Continuar con la siguiente función en la cadena
  } catch (error) {
    // Si el token es inválido o ha expirado, enviar el error
    res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};
