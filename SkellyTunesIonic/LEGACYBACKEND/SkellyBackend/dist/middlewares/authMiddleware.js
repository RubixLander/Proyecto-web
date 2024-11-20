"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Almacenar el usuario decodificado en el request
        next(); // Continuar con la siguiente función en la cadena
    }
    catch (error) {
        return res.status(401).json({ error: 'Token no válido o expirado.' });
    }
};
exports.verificarToken = verificarToken;
// Middleware para verificar si el usuario tiene permisos de admin
const esAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Usuario no autorizado.' });
    }
    next(); // El usuario es admin, continuar con la siguiente función
};
exports.esAdmin = esAdmin;
