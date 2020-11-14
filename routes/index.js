const express = require('express');
const { body } = require('express-validator');

// Controlador para proyectos
const proyectosController = require('../controllers/proyectosController');

// Almanamiento de rutas
const router = express.Router();

module.exports = function(){
    // Ruta para página Home
    router.get('/', proyectosController.proyectosHome);

    // Sirve formulario para proyecto nuevo
    router.get('/nuevo-proyecto', proyectosController.nuevoProyecto);

    // Muestra todos los proyectos
    router.get('/proyectos', proyectosController.proyectosAll); 

    // Muestra proyecto por URL
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Muestra proyecto por ID
    router.get('/proyectos/editar/:id', proyectosController.editarProyecto);


    // Guarda un nuevo proyecto
    router.post(
        '/guardar-proyecto',        
        body('nombre').notEmpty().trim().escape(),
        proyectosController.crearproyecto
    );

    // Actualiza un proyectp
    router.post(
        '/guardar-proyecto/:id',        
        body('nombre').notEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    return router;
}



