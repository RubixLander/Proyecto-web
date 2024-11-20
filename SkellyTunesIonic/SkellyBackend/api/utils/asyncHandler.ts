import { Request, Response, NextFunction } from 'express';

// Función que recibe un controlador y maneja los errores automáticamente
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Captura los errores y los pasa a un manejador global de errores
  };

export default asyncHandler;
