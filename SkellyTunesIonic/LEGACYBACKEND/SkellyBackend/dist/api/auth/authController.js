"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarSesionHandler = exports.registrarUsuarioHandler = exports.iniciarSesion = exports.registrarUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../../models/Usuario"));
// Wrapper para manejar promesas asincrónicas de forma correcta
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch();
// Registrar nuevo usuario
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag, nombre, contrasena } = req.body;
    // Verificar si el usuario ya existe
    const usuarioExistente = yield Usuario_1.default.findByPk(tag);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }
    // Cifrar la contraseña
    const contrasenaCifrada = yield bcryptjs_1.default.hash(contrasena, 10);
    // Crear un nuevo usuario
    try {
        const nuevoUsuario = yield Usuario_1.default.create({ tag, nombre, contrasena: contrasenaCifrada });
        return res.status(201).json({ message: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});
exports.registrarUsuario = registrarUsuario;
// Iniciar sesión
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag, contrasena } = req.body;
    // Buscar usuario por tag
    const usuario = yield Usuario_1.default.findByPk(tag);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Verificar contraseña
    const contrasenaValida = yield bcryptjs_1.default.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    // Crear token JWT
    const token = jsonwebtoken_1.default.sign({ tag: usuario.tag }, process.env.SECRET_KEY || 'defaultSecret', { expiresIn: '1h' });
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
});
exports.iniciarSesion = iniciarSesion;
// Usar asyncHandler para envolver las funciones asincrónicas
exports.registrarUsuarioHandler = asyncHandler(exports.registrarUsuario);
exports.iniciarSesionHandler = asyncHandler(exports.iniciarSesion);
