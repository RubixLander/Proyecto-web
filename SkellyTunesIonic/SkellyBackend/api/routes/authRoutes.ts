// /api/auth/authRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';  // Para cifrar contraseñas
import jwt from 'jsonwebtoken';  // Para manejar JWT
import Usuario from '../models/Usuario';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { tag, nombre, contrasena, correo } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findByPk(tag);
    if (usuarioExistente) {
      res.status(400).json({ error: 'El usuario ya existe' });
      return; // Evitar continuar con el código si el usuario ya existe
    }

    // Verificar si el correo ya está registrado
    const correoExistente = await Usuario.findOne({ where: { correo } });
    if (correoExistente) {
        res.status(400).json({ error: 'El correo ya está registrado' });
        return;
    }

    // Cifrar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const contrasenaCifrada = await bcrypt.hash(contrasena, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({ tag, nombre, contrasena: contrasenaCifrada, correo });

    // Responder exitosamente
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: { tag: nuevoUsuario.tag, nombre: nuevoUsuario.nombre },
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    next(error);  // Pasar el error al middleware de manejo de errores
  }
});

// Ruta para iniciar sesión (login)
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { tag, contrasena } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findByPk(tag);
    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return; // Evitar continuar con el código si el usuario no es encontrado
    }

    // Verificar la contraseña
    const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValido) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return; // Evitar continuar con el código si la contraseña es incorrecta
    }

    // Crear el token JWT con el payload
    const token = jwt.sign(
      { tag: usuario.tag, rol: usuario.rol },  // Payload del token
      process.env.SECRET_KEY as string,         // Clave secreta
      { expiresIn: '1h' }                      // Expiración del token
    );

    // Devolver el token en la respuesta
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    next(error);  // Pasar el error al middleware de manejo de errores
  }
});

export default router;