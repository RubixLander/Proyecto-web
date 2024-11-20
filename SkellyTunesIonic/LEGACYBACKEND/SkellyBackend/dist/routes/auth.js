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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Para cifrar contraseñas
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Para manejar JWT
const Usuario_1 = __importDefault(require("../models/Usuario"));
const router = express_1.default.Router();
// Ruta para registrar un nuevo usuario
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag, nombre, contrasena } = req.body;
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = yield Usuario_1.default.findByPk(tag);
        if (usuarioExistente) {
            res.status(400).json({ error: 'El usuario ya existe' });
            return; // Evitar continuar ejecutando el código
        }
        // Cifrar la contraseña antes de guardarla
        const salt = yield bcryptjs_1.default.genSalt(10);
        const contrasenaCifrada = yield bcryptjs_1.default.hash(contrasena, salt);
        // Crear el nuevo usuario
        const nuevoUsuario = yield Usuario_1.default.create({ tag, nombre, contrasena: contrasenaCifrada });
        // Devolver una respuesta exitosa
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            usuario: { tag: nuevoUsuario.tag, nombre: nuevoUsuario.nombre },
        });
    }
    catch (error) {
        console.error('Error al registrar el usuario:', error);
        next(error); // Pasar el error al manejador global de errores
    }
}));
// Ruta para iniciar sesión (login)
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag, contrasena } = req.body;
    try {
        // Buscar al usuario en la base de datos
        const usuario = yield Usuario_1.default.findByPk(tag);
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return; // Evitar continuar si no se encuentra el usuario
        }
        // Verificar la contraseña
        const esValido = yield bcryptjs_1.default.compare(contrasena, usuario.contrasena);
        if (!esValido) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return; // Evitar continuar si la contraseña no es válida
        }
        // Crear un token JWT con el payload que incluye el tag y el rol del usuario
        const token = jsonwebtoken_1.default.sign({ tag: usuario.tag, rol: usuario.rol }, // Payload
        process.env.SECRET_KEY, // Clave secreta
        { expiresIn: '1h' } // Expiración del token
        );
        // Devolver el token como respuesta
        res.json({ message: 'Inicio de sesión exitoso', token });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        next(error); // Pasar el error al manejador global de errores
    }
}));
exports.default = router;
