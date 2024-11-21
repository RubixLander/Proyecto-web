const express = require('express');
const bcrypt = require('bcryptjs');  // Para comparar las contraseñas encriptadas
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db'); // Importar la conexión a la base de datos

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

      // Si las credenciales son correctas, devolver una respuesta positiva con un token
      const token = jwt.sign({ correo: row.correo }, 'secretkey', { expiresIn: '1h' }); // Cambiado 'tag' por 'correo'
      return res.status(200).json({ message: 'Login exitoso.', token });
    });
  });
});

  

module.exports = router;
