// Importamos el modelo Receta para interactuar con la colección en MongoDB
const Receta = require('../models/recetaModel');


// Obtener todas las recetas desde la base de datos
const obtenerRecetas = async (req, res) => {
  try {
    // Buscamos todas las recetas y populamos el campo 'creadoPor' para mostrar los datos del usuario (nombre y email)
    const recetas = await Receta.find().populate('creadoPor', 'nombre email');
    
    // Enviamos las recetas encontradas como respuesta en formato JSON
    res.json(recetas);
  } catch (error) {
    // Si hay un error, devolvemos un mensaje de error 500 (interno)
    res.status(500).json({ mensaje: 'Error al obtener recetas', error });
  }
};


// Crear una nueva receta en la base de datos
const crearReceta = async (req, res) => {
  try {
    // Extraemos los datos del cuerpo de la solicitud (enviados por el cliente)
    const { titulo, ingredientes, instrucciones, creadoPor } = req.body;

    // Creamos un nuevo documento de Receta usando esos datos
    const nuevaReceta = new Receta({
      titulo,
      ingredientes,
      instrucciones,
      creadoPor
    });

    // Guardamos la receta en la base de datos
    const recetaGuardada = await nuevaReceta.save();

    // Devolvemos la receta creada con código 201 (creado exitosamente)
    res.status(201).json(recetaGuardada);
  } catch (error) {
    // Si hay error en la validación de datos o guardado, devolvemos 400 (solicitud incorrecta)
    res.status(400).json({ mensaje: 'Error al crear receta', error });
  }
};


// Actualizar una receta existente por ID
const actualizarReceta = async (req, res) => {
  try {
    // Buscamos la receta por ID y actualizamos con los nuevos datos del body
    const recetaActualizada = await Receta.findByIdAndUpdate(
      req.params.id,   // ID de la receta recibido por parámetro en la URL
      req.body,        // Nuevos datos
      { new: true }    // new: true hace que devuelva la receta ya actualizada
    );

    // Si no se encuentra, devolvemos error 404 (no encontrado)
    if (!recetaActualizada) {
      return res.status(404).json({ mensaje: 'Receta no encontrada' });
    }

    // Devolvemos la receta actualizada
    res.json(recetaActualizada);
  } catch (error) {
    // Si hay error, devolvemos 400 (solicitud incorrecta)
    res.status(400).json({ mensaje: 'Error al actualizar receta', error });
  }
};


// Eliminar una receta por ID
const eliminarReceta = async (req, res) => {
  try {
    // Buscamos y eliminamos la receta con el ID recibido en los parámetros
    const recetaEliminada = await Receta.findByIdAndDelete(req.params.id);

    // Si no existe la receta, devolvemos 404
    if (!recetaEliminada) {
      return res.status(404).json({ mensaje: 'Receta no encontrada' });
    }

    // Confirmamos la eliminación
    res.json({ mensaje: 'Receta eliminada correctamente' });
  } catch (error) {
    // Si ocurre un error interno, devolvemos 500
    res.status(500).json({ mensaje: 'Error al eliminar receta', error });
  }
};


// Exportamos todas las funciones para usarlas en las rutas
module.exports = {
  obtenerRecetas,
  crearReceta,
  actualizarReceta,
  eliminarReceta
};