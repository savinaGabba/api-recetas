// Importamos mongoose para definir el esquema de la receta
const mongoose = require('mongoose');


const RecetaSchema = new mongoose.Schema({
  // Título de la receta (obligatorio)
  titulo: {
    type: String,
    required: true
  },

  // Lista de ingredientes (obligatoria)
  // Se guarda como un array de strings
  ingredientes: {
    type: [String],
    required: true
  },

  // Instrucciones de preparación (obligatorias)
  instrucciones: {
    type: String,
    required: true
  },

  // Tiempo estimado de preparación en minutos (opcional, por defecto es 0)
  tiempoPreparacion: {
    type: Number,
    default: 0
  },

  // Relación con el usuario que creó la receta
  // Guarda un ID que referencia al modelo 'Usuario'
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});


// Exportamos el modelo 'Receta' para poder usarlo en controladores y rutas
module.exports = mongoose.model('Receta', RecetaSchema);
