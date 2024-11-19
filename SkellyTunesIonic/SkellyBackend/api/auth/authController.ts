// api/auth/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../../models/Usuario';

// Wrapper para manejar promesas asincrónicas de forma correcta
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) =>
  Promise.resolve(fn(req, res, next)).catch();

// Registrar nuevo usuario
export const registrarUsuario = async (req: Request, res: Response): Promise<Response> => {
  const { tag, nombre, contrasena } = req.body;

  // Verificar si el usuario ya existe
  const usuarioExistente = await Usuario.findByPk(tag);
  if (usuarioExistente) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  // Cifrar la contraseña
  const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

  // Crear un nuevo usuario
  try {
    const nuevoUsuario = await Usuario.create({ tag, nombre, contrasena: contrasenaCifrada });
    return res.status(201).json({ message: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
export const iniciarSesion = async (req: Request, res: Response): Promise<Response> => {
  const { tag, contrasena } = req.body;

  // Buscar usuario por tag
  const usuario = await Usuario.findByPk(tag);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Verificar contraseña
  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Crear token JWT
  const token = jwt.sign({ tag: usuario.tag }, process.env.SECRET_KEY || 'defaultSecret', { expiresIn: '1h' });

  return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
};

// Usar asyncHandler para envolver las funciones asincrónicas
export const registrarUsuarioHandler = asyncHandler(registrarUsuario);
export const iniciarSesionHandler = asyncHandler(iniciarSesion);
