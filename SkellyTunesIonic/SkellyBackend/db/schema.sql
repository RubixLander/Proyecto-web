BEGIN;

-- Primero las tablas que son referenciadas
-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios
(
    tag TEXT NOT NULL PRIMARY KEY,
    nombre TEXT,
    "contraseña" TEXT,
    correo TEXT
);

-- Tabla generos
CREATE TABLE IF NOT EXISTS generos
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
);

-- Tabla albums
CREATE TABLE IF NOT EXISTS albums
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coverart TEXT,
    titulo TEXT,
    "año" INTEGER
);

-- Ahora las tablas que contienen claves foráneas
-- Tabla albumartista
CREATE TABLE IF NOT EXISTS albumartista
(
    usuario_tag TEXT NOT NULL,
    album_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, album_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios (tag),
    FOREIGN KEY (album_id) REFERENCES albums (id)
);

-- Tabla albumgenero
CREATE TABLE IF NOT EXISTS albumgenero
(
    album_id INTEGER NOT NULL,
    genero_id INTEGER NOT NULL,
    PRIMARY KEY (album_id, genero_id),
    FOREIGN KEY (album_id) REFERENCES albums (id),
    FOREIGN KEY (genero_id) REFERENCES generos (id)
);

-- Tabla canciones
CREATE TABLE IF NOT EXISTS canciones
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track INTEGER,
    titulo TEXT,
    duracion TEXT,  -- Usamos TEXT para representar el tipo TIME
    album INTEGER,
    FOREIGN KEY (album) REFERENCES albums (id)
);

-- Tabla canciongenero
CREATE TABLE IF NOT EXISTS canciongenero
(
    cancion_id INTEGER NOT NULL,
    genero_id INTEGER NOT NULL,
    PRIMARY KEY (cancion_id, genero_id),
    FOREIGN KEY (cancion_id) REFERENCES canciones (id),
    FOREIGN KEY (genero_id) REFERENCES generos (id)
);

-- Tabla playlists
CREATE TABLE IF NOT EXISTS playlists
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    detalle TEXT,
    creador TEXT,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creador) REFERENCES usuarios (tag)
);

-- Tabla playlistcanciones
CREATE TABLE IF NOT EXISTS playlistcanciones
(
    playlist_id INTEGER NOT NULL,
    cancion_id INTEGER NOT NULL,
    PRIMARY KEY (playlist_id, cancion_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists (id),
    FOREIGN KEY (cancion_id) REFERENCES canciones (id)
);

-- Tabla comunidades
CREATE TABLE IF NOT EXISTS comunidades
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    creador TEXT,
    headerText TEXT,
    FOREIGN KEY (creador) REFERENCES usuarios (tag)
);

-- Tabla miembroscomunidad
CREATE TABLE IF NOT EXISTS miembroscomunidad
(
    usuario_tag TEXT NOT NULL,
    comunidad_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, comunidad_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios (tag),
    FOREIGN KEY (comunidad_id) REFERENCES comunidades (id)
);

-- Tabla discusiones
CREATE TABLE IF NOT EXISTS discusiones
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    detalle TEXT,
    comunidad INTEGER,
    creador TEXT,
    fecha TEXT,  -- Usamos TEXT para representar el tipo DATE
    FOREIGN KEY (comunidad) REFERENCES comunidades (id),
    FOREIGN KEY (creador) REFERENCES usuarios (tag)
);

-- Tabla respuestas
CREATE TABLE IF NOT EXISTS respuestas
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creador TEXT,
    discussionId INTEGER,
    detalle TEXT,
    fecha TEXT,  -- Usamos TEXT para representar el tipo DATE
    reply INTEGER,  -- Este es un campo de tipo INTEGER, lo interpretamos como ID de respuesta
    FOREIGN KEY (creador) REFERENCES usuarios (tag),
    FOREIGN KEY (discussionId) REFERENCES discusiones (id)
);

-- Tabla comentarios
CREATE TABLE IF NOT EXISTS comentarios
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comentario TEXT,
    usuario TEXT,
    cancion INTEGER,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES usuarios (tag),
    FOREIGN KEY (cancion) REFERENCES canciones (id)
);

-- Tabla perfiles
CREATE TABLE IF NOT EXISTS perfiles (
    id INTEGER PRIMARY KEY,
    tag TEXT,
    avatar TEXT,
    background TEXT,
    informacion TEXT,
    headerText TEXT,
    FOREIGN KEY (tag) REFERENCES usuarios(tag)
);

-- Tabla seguidosUsuarios
CREATE TABLE IF NOT EXISTS seguidosUsuarios (
    seguidor_tag TEXT,
    seguido_tag TEXT,
    PRIMARY KEY (seguidor_tag, seguido_tag),
    FOREIGN KEY (seguidor_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (seguido_tag) REFERENCES usuarios(tag)
);

-- Nueva tabla para almacenar los álbumes guardados por los usuarios (Me gusta)
CREATE TABLE IF NOT EXISTS album_me_gusta (
    usuario_tag TEXT NOT NULL,
    album_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, album_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (album_id) REFERENCES albums(id)
);

-- Nueva tabla para almacenar las canciones guardadas por los usuarios (Me gusta)
CREATE TABLE IF NOT EXISTS cancion_me_gusta (
    usuario_tag TEXT NOT NULL,
    cancion_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, cancion_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (cancion_id) REFERENCES canciones(id)
);

END;
