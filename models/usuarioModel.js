// Importamos mongoose para definir el esquema de usuario
const mongoose = require('mongoose');

// Importamos bcrypt para encriptar la contraseña antes de guardarla
const bcrypt = require('bcrypt');


const UsuarioSchema = new mongoose.Schema({
  // Nombre del usuario (obligatorio)
  nombre: {
    type: String,
    required: true
  },

  // Email del usuario (obligatorio y único)
  email: {
    type: String,
    required: true,
    unique: true // Evita que se registren dos usuarios con el mismo email
  },

  // Contraseña del usuario (obligatoria)
  contraseña: {
    type: String,
    required: true,
    select: false // Esto hace que la contraseña no se devuelva por defecto en las consultas
  }
});


// Antes de guardar el usuario, encriptamos la contraseña
UsuarioSchema.pre('save', async function (next) {
  // Si la contraseña no fue modificada, pasamos al siguiente middleware
  if (!this.isModified('contraseña')) return next();

  try {
    // Generamos un 'salt' para aumentar la seguridad del hash
    const salt = await bcrypt.genSalt(10);

    // Encriptamos la contraseña con ese salt
    this.contraseña = await bcrypt.hash(this.contraseña, salt);

    // Continuamos con el guardado
    next();
  } catch (error) {
    // Si hay un error, lo pasamos a la función de manejo de errores
    next(error);
  }
});


// Exportamos el modelo 'Usuario' para usarlo en los controladores
module.exports = mongoose.model('Usuario', UsuarioSchema);

