const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Crear y conectar a la base de datos SQLite
const dbPath = process.env.DB_STORAGE; // Ajusta esta ruta según tu estructura de carpetas
const schemaPath = process.env.SCHEMA_STORAGE;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');

    // Activar las claves foráneas para esta sesión de base de datos
    db.run("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("Error al activar las claves foráneas:", err);
      } else {
        console.log("Claves foráneas activadas");
      }
    });
  }
});

// Inicializar la base de datos
const initializeDatabase = () => {
  const schemaPath = process.env.SCHEMA_STORAGE; // Cambia 'data/schema.sql' a 'db/schema.sql'
  fs.readFile(schemaPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo el archivo SQL', err);
      return;
    }
    db.exec(data, (err) => {
      if (err) {
        console.error('Error ejecutando el script SQL', err);
      } else {
        console.log('Base de datos inicializada correctamente');
      }
    });
  });
};

// Llamar a la función para inicializar la base de datos
initializeDatabase();

// Exportar la base de datos para usarla en otros archivos
module.exports = db;