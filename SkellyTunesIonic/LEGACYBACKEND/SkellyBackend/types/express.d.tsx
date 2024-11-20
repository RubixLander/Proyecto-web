import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // O puedes definir un tipo más específico para el usuario
    }
  }
}

// Es importante asegurarte de que TypeScript reconozca este archivo
export {};
