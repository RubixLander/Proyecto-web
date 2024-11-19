import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error interno:', err);
  res.status(500).json({
    error: 'Ocurrió un error interno en el servidor',
    message: err.message || 'Error desconocido',
  });
};

export default errorHandler;
