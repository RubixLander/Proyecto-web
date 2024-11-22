BEGIN;
CREATE TABLE IF NOT EXISTS usuarios
(
    tag TEXT NOT NULL PRIMARY KEY,
    nombre TEXT,
    "contraseña" TEXT,
    correo TEXT
);
INSERT INTO usuarios VALUES('@minimo','[minimo]','$2a$10$eyaU60cH6P0yyd5/jvEoouAX9A1CbsSi2W4bDQF4HmM4GVp94pxUe','minimo@mail.com');
INSERT INTO usuarios VALUES('@telepath','telepath','$2a$10$VyJE6vcbrt23eUNJWv8uz.P17Tib4J9VwnjVqZ6z1fqEQwmXFTDOG','telepath@mail.com');
INSERT INTO usuarios VALUES('@rubixlander','RubixLander','$2a$10$aGLHYI7E95yWG4dFrBspcOFmu/QpNUQiFffNlknl//9Mk5loy5i7K','rubixlander@mail.com');
INSERT INTO usuarios VALUES('@radiohead','Radiohead','$2a$10$ckfl7Xac5zhGqQCT8Hi8Cebk60E89HdLDyUCtlEoR5dSyctHTMNny','radiohead@mail.com');
INSERT INTO usuarios VALUES('@ridiculon','Ridiculon','$2a$10$95Yb0BDo7QOKxMz9nuW7tu8BAq1LmIQ/vyiElMXcjiPiTA.9Po0ge','ridiculon@mail.com');
CREATE TABLE generos
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
);
CREATE TABLE IF NOT EXISTS albums
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coverart TEXT,
    titulo TEXT,
    "año" INTEGER
);
INSERT INTO albums VALUES(1,'https://f4.bcbits.com/img/a0972302045_16.jpg','Cul de Sac',2024);
INSERT INTO albums VALUES(2,'https://f4.bcbits.com/img/a0164762771_16.jpg','COSMIC TAPES VOL.1',2024);
INSERT INTO albums VALUES(3,'https://f4.bcbits.com/img/a0206112719_16.jpg','(Proto​-​Minimo - Separate EP​)​VOL​.​1',2024);
INSERT INTO albums VALUES(4,'https://f4.bcbits.com/img/a3299161969_16.jpg','The End Is Nigh: OST',2024);
INSERT INTO albums VALUES(5,'https://f4.bcbits.com/img/a3689153513_16.jpg','The Binding Of Isaac - Afterbirth+ OST',2024);
INSERT INTO albums VALUES(6,'https://f4.bcbits.com/img/a0138267232_16.jpg','The Bends',2024);
INSERT INTO albums VALUES(7,'https://f4.bcbits.com/img/a0808547322_16.jpg','Kid A',2024);
INSERT INTO albums VALUES(8,'https://f4.bcbits.com/img/a0552435637_16.jpg','In Rainbows',2024);
CREATE TABLE IF NOT EXISTS albumartista
(
    usuario_tag TEXT NOT NULL,
    album_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, album_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios (tag),
    FOREIGN KEY (album_id) REFERENCES albums (id)
);
INSERT INTO albumartista VALUES('@minimo',1);
INSERT INTO albumartista VALUES('@minimo',2);
INSERT INTO albumartista VALUES('@minimo',3);
INSERT INTO albumartista VALUES('@ridiculon',4);
INSERT INTO albumartista VALUES('@ridiculon',5);
INSERT INTO albumartista VALUES('@radiohead',6);
INSERT INTO albumartista VALUES('@radiohead',7);
INSERT INTO albumartista VALUES('@radiohead',8);
CREATE TABLE IF NOT EXISTS albumgenero
(
    album_id INTEGER NOT NULL,
    genero_id INTEGER NOT NULL,
    PRIMARY KEY (album_id, genero_id),
    FOREIGN KEY (album_id) REFERENCES albums (id),
    FOREIGN KEY (genero_id) REFERENCES generos (id)
);
CREATE TABLE IF NOT EXISTS canciones
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track INTEGER,
    titulo TEXT,
    duracion TEXT,  -- Usamos TEXT para representar el tipo TIME
    album INTEGER,
    archivo_path TEXT,
    FOREIGN KEY (album) REFERENCES albums (id)
);
INSERT INTO canciones VALUES  (1, 1, 'Terminus ( ________ )', '3:52', 5, 'uploads/canciones/1_terminus.mp3');
INSERT INTO canciones VALUES  (2, 2, 'Delirium', '3:43', 5, 'uploads/canciones/2_delirium.mp3');
INSERT INTO canciones VALUES  (3, 1, 'TITLE SCREEN', '3:24', 4, 'uploads/canciones/1_titlescreen.mp3');
INSERT INTO canciones VALUES  (4, 2, 'THE END', '3:19', 4, 'uploads/canciones/2_theend.mp3');
INSERT INTO canciones VALUES  (5, 3, 'RUIN', '4:47', 4, 'uploads/canciones/3_ruin.mp3');
INSERT INTO canciones VALUES  (6, 4, 'ACCEPTANCE', '6:07', 4, 'uploads/canciones/4_acceptance.mp3');
INSERT INTO canciones VALUES  (7, 1, 'Fake Plastic Trees', '4:49', 6, 'uploads/canciones/1_fake.mp3');
INSERT INTO canciones VALUES  (8, 2, 'Street Spirit', '4:14', 6, 'uploads/canciones/2_street.mp3');
INSERT INTO canciones VALUES  (9, 1, 'Nude', '4:15', 8, 'uploads/canciones/1_nude.mp3');
INSERT INTO canciones VALUES  (10, 2, 'All I Need', '3:48', 8, 'uploads/canciones/2_allineed.mp3');
INSERT INTO canciones VALUES  (11, 1, 'Everything in its right Place', '4:10', 7, 'uploads/canciones/1_every.mp3');
INSERT INTO canciones VALUES  (12, 2, 'Idioteque', '5:08', 7, 'uploads/canciones/2_idiot.mp3');
INSERT INTO canciones VALUES  (13, 1, 'Cul de Sac', '2:35', 1, 'uploads/canciones/1_culdesac.mp3');
INSERT INTO canciones VALUES  (14, 2, 'Fenix', '2:37', 1, 'uploads/canciones/2_idiot.mp3');
INSERT INTO canciones VALUES  (15, 1, 'BEACH SUNSET', '1:55', 2, 'uploads/canciones/1_beach.mp3');
INSERT INTO canciones VALUES  (16, 1, 'Tu Aliento', '3:28', 3, 'uploads/canciones/1_aliento.mp3');

CREATE TABLE IF NOT EXISTS canciongenero
(
    cancion_id INTEGER NOT NULL,
    genero_id INTEGER NOT NULL,
    PRIMARY KEY (cancion_id, genero_id),
    FOREIGN KEY (cancion_id) REFERENCES canciones (id),
    FOREIGN KEY (genero_id) REFERENCES generos (id)
);
CREATE TABLE IF NOT EXISTS playlists
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    detalle TEXT,
    art TEXT,
    creador TEXT,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creador) REFERENCES usuarios (tag)
);
CREATE TABLE IF NOT EXISTS playlistcanciones
(
    playlist_id INTEGER NOT NULL,
    cancion_id INTEGER NOT NULL,
    PRIMARY KEY (playlist_id, cancion_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists (id),
    FOREIGN KEY (cancion_id) REFERENCES canciones (id)
);
CREATE TABLE IF NOT EXISTS comunidades
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    creador TEXT,
    headerText TEXT,
    informacion TEXT,
    background TEXT,
    avatar TEXT,
    FOREIGN KEY (creador) REFERENCES usuarios (tag)
);
INSERT INTO comunidades VALUES(1,'Los Payasos de Micro','@rubixlander','Porque la vida es una comedia','Bienvenidos al el día del payaso. Este día los payasitos se reúnen para hacer unos chistositos bien grasiositos. "Oigale, cuente un chiste!" "....ehhhh...." El día del payaso 1 de abril de cualquier año. Todos los payasitos se reúnen para hacer felices a los niñitos y a los grandecitos también. "Oye, está el señor payaso, el señor payach-!" .... El día del payaso. Hay muchos payasitos, está el payasito chistosito, la payasita sin chichita, el payacho cacho HAHAA. Así que no esperes más, celebra a tu payasito favorito este día, y solo es 1, porque mañana es 2 HAHAAAAA.','https://balloonhq.com/wp-content/uploads/2024/01/Balloon_HQ_Resize_1920x1080_where_to_get_balloons_filled_with_helium.png','https://media.istockphoto.com/id/533837393/es/foto/payaso.jpg?s=612x612&w=0&k=20&c=x90RAkaZXoE5lqccTYwFLtyVtepTf8xVXY6AdXDPFZs=');
INSERT INTO comunidades VALUES(2,'Music Optimized for Abandoned Malls','@telepath','welcome to the virtual plaza','Global capitalism is nearly there. At the end of the world there will only be liquid advertisement and gaseous desire. Sublimated from our bodies, our untethered senses will endlessly ride escalators through pristine artificial environments, more and less than human, drugged-up and drugged down, catalyzed, consuming and consumed by a relentlessly rich economy of sensory information, valued by the pixel. The Virtual Plaza welcomes you, and you will welcome it too.','https://manybackgrounds.com/images/hd/vaporwave-holographic-sunset-48t0p39h7je2faf9.jpg','https://styles.redditmedia.com/t5_2ugcd/styles/communityIcon_irv7jyglvxh01.png');
CREATE TABLE IF NOT EXISTS miembroscomunidad
(
    usuario_tag TEXT NOT NULL,
    comunidad_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, comunidad_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios (tag),
    FOREIGN KEY (comunidad_id) REFERENCES comunidades (id)
);
INSERT INTO miembroscomunidad VALUES('@rubixlander',1);
INSERT INTO miembroscomunidad VALUES('@telepath',2);
INSERT INTO miembroscomunidad VALUES('@telepath',1);
INSERT INTO miembroscomunidad VALUES('@minimo',2);
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
INSERT INTO discusiones VALUES(1,'Forgot an amazing album name','Hey, I recall a dark purple album cover with a black trail leading somewhere. One of the tracks samples Over the horizon radar by Boards of Canada. Anyone remember this?',2,'@telepath','2024-11-21');
INSERT INTO discusiones VALUES(2,'Creen que salga el OST de silksong antes que el juego? xd','lo del titulo',1,'@rubixlander','2024-11-21');
INSERT INTO discusiones VALUES(3,'new launch!','Just launched my new EP, how is it?',2,'@minimo','2024-11-21');
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
CREATE TABLE IF NOT EXISTS perfiles (
    id INTEGER PRIMARY KEY,
    tag TEXT,
    avatar TEXT,
    background TEXT,
    informacion TEXT,
    headerText TEXT,
    FOREIGN KEY (tag) REFERENCES usuarios(tag)
);
INSERT INTO perfiles VALUES(1,'@minimo','https://f4.bcbits.com/img/0033779152_21.jpg','https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','nspired by the Low End Theory beat scene in Los Angeles like FlyingLotus,Mndsgn Dibia$e,STLNDMS and more.','Lo-Fi, Psychodelic Beats from my intoxicated mind.');
INSERT INTO perfiles VALUES(2,'@telepath','https://media.istockphoto.com/id/1818754016/vector/skull-human-skeleton-silhouette-human-skeleton-head-side-view-human-body-structure-anatomy-x.jpg?s=612x612&w=0&k=20&c=KgdJFMcH-k67VSjpb6KK_rNA_NPni4Bq6PlligzATcc=','https://images.pexels.com/photos/1229102/pexels-photo-1229102.jpeg?cs=srgb&dl=pexels-alexfu-1229102.jpg&fm=jpg','No he escrito nada aun!','Bone-chilling!');
INSERT INTO perfiles VALUES(3,'@rubixlander','https://media.istockphoto.com/id/1818754016/vector/skull-human-skeleton-silhouette-human-skeleton-head-side-view-human-body-structure-anatomy-x.jpg?s=612x612&w=0&k=20&c=KgdJFMcH-k67VSjpb6KK_rNA_NPni4Bq6PlligzATcc=','https://wallpapercave.com/wp/wp3454723.jpg','No he escrito nada aun!','Bone-chilling!');
INSERT INTO perfiles VALUES(4,'@radiohead','https://f4.bcbits.com/img/0037765652_21.jpg','https://i.pinimg.com/originals/f2/7c/7c/f27c7c8da8693d6d14696f68507f44e5.jpg','','Everything in its right place');
INSERT INTO perfiles VALUES(5,'@ridiculon','https://f4.bcbits.com/img/0037493971_21.jpg','https://i.pinimg.com/originals/52/40/cb/5240cbab8c29147ea45df79a6ee12090.jpg','No he escrito nada aun!','We write Game Music');
CREATE TABLE IF NOT EXISTS seguidosUsuarios (
    seguidor_tag TEXT,
    seguido_tag TEXT,
    PRIMARY KEY (seguidor_tag, seguido_tag),
    FOREIGN KEY (seguidor_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (seguido_tag) REFERENCES usuarios(tag)
);
CREATE TABLE IF NOT EXISTS album_me_gusta (
    usuario_tag TEXT NOT NULL,
    album_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, album_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (album_id) REFERENCES albums(id)
);
CREATE TABLE IF NOT EXISTS cancion_me_gusta (
    usuario_tag TEXT NOT NULL,
    cancion_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_tag, cancion_id),
    FOREIGN KEY (usuario_tag) REFERENCES usuarios(tag),
    FOREIGN KEY (cancion_id) REFERENCES canciones(id)
);
CREATE TABLE IF NOT EXISTS album_comunidad_destacado (
    comunidad_id INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    destacado BOOLEAN DEFAULT 1,  -- Indicador de si el album está destacado
    PRIMARY KEY (comunidad_id, album_id),
    FOREIGN KEY (comunidad_id) REFERENCES comunidades(id),
    FOREIGN KEY (album_id) REFERENCES albums(id)
);
INSERT INTO sqlite_sequence VALUES('albums',8);
INSERT INTO sqlite_sequence VALUES('comunidades',2);
INSERT INTO sqlite_sequence VALUES('discusiones',3);
COMMIT;