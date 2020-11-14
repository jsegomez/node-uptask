// Importaciones
const express = require('express')
const router = require('./routes');
const path = require('path');

// Configuracion de la base de datos
const db = require('./config/db');

// Importamos los modelos del proyecto
require('./models/Proyectos');

// Validamos la conexion a la base de datos
db.sync()
    .then(()=> console.log('Conectado a la base de datos'))
    .catch((error)=> console.log(error))

// Importación de express
const app = express();

// Agregamos express validator a toda la aplicación

// Archivos estaticos
app.use(express.static('public'));

// Motor de plantillas PUG
app.set('view engine', 'pug');

// PATH para las vistas del proyecto
app.set('views', path.join(__dirname, './views'));

// Leer datos de formulario
app.use(express.urlencoded({extended: true}));

// Configuración de rutas
app.use('/', router());

// Configuracion de puerto de escucha
app.listen(3000);

