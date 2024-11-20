"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error('Error interno:', err);
    res.status(500).json({
        error: 'Ocurrió un error interno en el servidor',
        message: err.message || 'Error desconocido',
    });
};
exports.default = errorHandler;
