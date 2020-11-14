const Proyectos = require('../models/Proyectos');

// Sirve la página de inicio
exports.proyectosHome = (req, res) => {
    res.render('index', {
        titulo: "Proyectos"
    });
}

// Muestra todos los proyectos
exports.proyectosAll = async(req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('proyectos/proyectos',{
        titulo: 'Todos los proyectos',
        proyectos
    });
}

// Sirve el formulario para registro de proyecto
exports.nuevoProyecto = (req, res) => {
    res.render('proyectos/nuevo', {
        titulo: 'Nuevo proyecto',
        tituloCard: 'Nuevo proyecto',
        tituloBtn: 'Crear proyecto'
    });
}

// Recibe formulario para registro de proyecto
exports.crearproyecto = async(req, res) => { 
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto':'Favor dar un nombre al proyecto'});
    }

    if(errores.length > 0){
        res.render('proyectos/nuevo', {
            titulo: "Nuevo proyecto",
            tituloCard: 'Nuevo proyecto',
            tituloBtn: 'Crear proyecto',
            errores: errores
        });        
    }else{        
        nuevoProyecto = await Proyectos.create({nombre});
        res.redirect(`/proyectos/${nuevoProyecto.url}`);
    }    
}

// Busca un proyecto por url
exports.proyectoPorUrl = async(req, res, next)=>{    
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto){next()}

    res.render('proyectos/detalle',{
        titulo: proyecto.nombre,
        proyecto
    });
}

// Sirve formulario para editar proyecto
exports.editarProyecto = async(req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where:{
            id: req.params.id
        }
    });

    if(!proyecto){next()}

    res.render('proyectos/nuevo', {
        titulo: 'Editar proyecto',
        tituloCard: 'Nuevo nombre',
        tituloBtn: 'Guardar cambios',
        proyecto
    });
}

// Actualiza proyecto
exports.actualizarProyecto = async(req, res, next) => {
    const nuevoNombre = req.body.nombre;
    let errores = [];
    console.log(req.params.id);

    if(!nuevoNombre){
        errores.push({'texto':'Favor dar un nombre al proyecto'});
    }

    if(errores.length > 0){
        res.render('proyectos/nuevo', {
            titulo: 'Editar proyecto',
            tituloCard: 'Nuevo nombre',
            tituloBtn: 'Guardar cambios',
            errores: errores
        });        
    }else{
        const proyecto = await Proyectos.findOne({where:{id: req.params.id}})
        await Proyectos.update(
            {nombre: nuevoNombre},
            {where: {id: req.params.id}}
        );
        res.redirect(`/proyectos/${proyecto.url}`);
    } 
}

