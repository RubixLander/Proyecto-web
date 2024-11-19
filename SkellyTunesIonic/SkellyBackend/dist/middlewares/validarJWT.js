"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para verificar el JWT
const verificarToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        // No usamos `return` aquí, solo enviamos la respuesta
        res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
        return; // Esta línea es opcional pero puede ayudar a evitar errores de ejecución posterior
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Guardamos el usuario decodificado en la request
        next(); // Continuamos con la siguiente función
    }
    catch (error) {
        // Si el token es inválido, enviamos una respuesta con error sin `return`
        res.status(401).json({ error: 'Token no válido o expirado.' });
    }
};
exports.verificarToken = verificarToken;
// Middleware para verificar si el usuario es admin
const esAdmin = (req, res, next) => {
    var _a;
    // Verificamos si el usuario tiene el rol de 'admin'
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) !== 'admin') {
        // Enviamos el error de acceso denegado sin usar `return`
        res.status(403).json({ error: 'Acceso denegado. No eres administrador.' });
        return; // Esta línea es opcional
    }
    next(); // Si es admin, pasamos al siguiente middleware o controlador
};
exports.esAdmin = esAdmin;
