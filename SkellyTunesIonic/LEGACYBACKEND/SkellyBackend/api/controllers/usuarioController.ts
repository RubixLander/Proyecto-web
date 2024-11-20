import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import Perfiles from '../models/Perfiles';
import jwt from 'jsonwebtoken';

// Wrapper para manejar promesas asincrónicas de forma correcta
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

// Middleware para verificar JWT
const verificarToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];  // Obtener token del header

  if (!token) {
    res.status(403).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'defaultSecret');
    req.user = decoded;  // Almacena la información decodificada en `req.user`
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Función para iniciar sesión
export const iniciarSesionHandler = async (req: Request, res: Response): Promise<void> => {
  const { correo, contrasena } = req.body;

  const usuario = await Usuario.findOne({ where: { correo } });
  
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) {
    res.status(400).json({ error: 'Contraseña incorrecta' });
    return;
  }

  const token = jwt.sign(
    { tag: usuario.tag, correo: usuario.correo },
    process.env.SECRET_KEY || 'defaultSecret',
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    token,
  });
};

// Función para registrar un usuario
export const registrarUsuarioHandler = async (req: Request, res: Response): Promise<void> => {
  const { tag, nombre, contrasena, correo, informacion, avatar, background } = req.body;

  if (!tag || !nombre || !contrasena || !correo) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  const usuarioExistente = await Usuario.findByPk(tag);
  if (usuarioExistente) {
    res.status(400).json({ error: 'El usuario ya existe' });
    return;
  }

  const correoExistente = await Usuario.findOne({ where: { correo } });
  if (correoExistente) {
    res.status(400).json({ error: 'El correo ya está registrado' });
    return;
  }

  const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

  const nuevoUsuario = await Usuario.create({
    tag,
    nombre,
    contrasena: contrasenaCifrada,
    correo,
  });

  const nuevoPerfil = await Perfiles.create({
    tag,
    informacion,
    avatar,
    background,
  });

  res.status(201).json({
    message: 'Usuario y perfil creados correctamente',
    usuario: nuevoUsuario,
    perfil: nuevoPerfil,
  });
};

// Crear un nuevo usuario con perfil
export const crearUsuarioConPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { tag, nombre, contrasena, correo, informacion, avatar, background } = req.body;

  if (!tag || !nombre || !contrasena || !correo) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  const usuarioExistente = await Usuario.findByPk(tag);
  if (usuarioExistente) {
    res.status(400).json({ error: 'El usuario ya existe' });
    return;
  }

  const correoExistente = await Usuario.findOne({ where: { correo } });
  if (correoExistente) {
    res.status(400).json({ error: 'El correo ya está registrado' });
    return;
  }

  const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

  const nuevoUsuario = await Usuario.create({
    tag,
    nombre,
    contrasena: contrasenaCifrada,
    correo,
  });

  const nuevoPerfil = await Perfiles.create({
    tag,
    informacion,
    avatar,
    background,
  });

  res.status(201).json({
    message: 'Usuario y perfil creados correctamente',
    usuario: nuevoUsuario,
    perfil: nuevoPerfil,
  });
});

// Obtener un usuario por tag y su perfil asociado
export const obtenerUsuarioConPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { tag } = req.params;

  const usuario = await Usuario.findByPk(tag, {
    include: [{ model: Perfiles, required: true }],
  });

  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  res.status(200).json({
    usuario,
    perfil: usuario.Perfil,
  });
});

// Actualizar usuario y su perfil
export const actualizarUsuarioYPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { tag } = req.user as { tag: string };  // Extraemos el tag del usuario autenticado
  const { nombre, contrasena, informacion, avatar, background } = req.body;

  if (req.body.tag && req.body.tag !== tag) {
    res.status(403).json({ error: 'No tienes permisos para actualizar este usuario' });
    return;
  }

  const usuario = await Usuario.findByPk(tag);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  if (nombre) usuario.nombre = nombre;
  if (contrasena) usuario.contrasena = await bcrypt.hash(contrasena, 10);

  await usuario.save();

  const perfil = await Perfiles.findByPk(tag);
  if (perfil) {
    if (informacion) perfil.informacion = informacion;
    if (avatar) perfil.avatar = avatar;
    if (background) perfil.background = background;

    await perfil.save();
  }

  res.status(200).json({ message: 'Usuario y perfil actualizados correctamente' });
});

// Eliminar usuario y perfil
export const eliminarUsuarioYPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { tag } = req.params;

  const usuario = await Usuario.findByPk(tag);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  const perfil = await Perfiles.findByPk(tag);
  if (perfil) {
    await perfil.destroy();
  }

  await usuario.destroy();
  res.status(200).json({ message: 'Usuario y perfil eliminados correctamente' });
});
