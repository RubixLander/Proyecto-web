const express = require('express');
const bcrypt = require('bcryptjs');  // Para comparar las contraseñas encriptadas
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db'); // Importar la conexión a la base de datos

// Usar la SECRET_KEY desde el archivo .env
const SECRET_KEY = process.env.SECRET_KEY;

// Ruta para login
router.post('/login', (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar que los datos son recibidos correctamente
  console.log('Datos recibidos:', req.body);

  // Validar que los datos fueron enviados
  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Por favor ingrese el correo y la contraseña.' });
  }

  // Consultar la base de datos para encontrar el usuario con el correo proporcionado
  const sql = 'SELECT * FROM usuarios WHERE correo = ?'; // Cambiado 'tag' por 'correo'
  db.get(sql, [correo], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    bcrypt.compare(contraseña, row.contraseña, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al comparar las contraseñas.' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }

      // Si las credenciales son correctas, devolver una respuesta positiva con un token y el tag del usuario
      const token = jwt.sign({ correo: row.correo, tag: row.tag }, process.env.SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ 
        message: 'Login exitoso.', 
        token, 
        tag: row.tag // Aquí agregamos el tag del usuario encontrado
      });
    });
  });
});


// Ruta para registro de usuario
router.post('/registro', (req, res) => {
  const { tag, nombre, correo, contraseña, avatar, background, informacion, headerText } = req.body;

  if (!tag || !nombre || !correo || !contraseña) {
    return res.status(400).json({ error: 'Por favor ingrese todos los datos obligatorios (tag, nombre, correo, contraseña).' });
  }

  const sqlCheckEmail = 'SELECT * FROM usuarios WHERE correo = ?';
  db.get(sqlCheckEmail, [correo], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error al encriptar la contraseña.' });
      }

      const sqlInsertUser = 'INSERT INTO usuarios (tag, nombre, correo, contraseña) VALUES (?, ?, ?, ?)';
      db.run(sqlInsertUser, [tag, nombre, correo, hashedPassword], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const sqlInsertProfile = 'INSERT INTO perfiles (tag, avatar, background, informacion, headerText) VALUES (?, ?, ?, ?, ?)';
        db.run(sqlInsertProfile, [tag, avatar, background, informacion, headerText], function(err) {
          if (err) {
            return res.status(500).json({ error: 'Error al insertar el perfil.' });
          }

          const token = jwt.sign({ correo: row.correo, tag: row.tag }, process.env.SECRET_KEY, { expiresIn: '1h' });
          return res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
        });
      });
    });
  });
});

module.exports = router;
