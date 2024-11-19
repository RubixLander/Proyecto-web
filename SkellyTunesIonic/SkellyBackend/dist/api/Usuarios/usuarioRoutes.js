"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Middleware para verificar el JWT
const verificarToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Token no válido o expirado.' });
    }
};
exports.verificarToken = verificarToken;
// Middleware para verificar si el usuario es admin
const esAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) !== 'admin') {
        res.status(403).json({ error: 'Acceso denegado. No eres administrador.' });
        return;
    }
    next();
};
exports.esAdmin = esAdmin;
// Exportamos el router
exports.default = router; // Aquí estamos exportando el router por defecto
