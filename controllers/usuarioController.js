// Importamos el modelo de Usuario para interactuar con la base de datos
const Usuario = require('../models/usuarioModel');

// Importamos bcrypt para comparar y encriptar contraseñas
const bcrypt = require('bcrypt');

// Importamos JWT para generar tokens de autenticación
const jwt = require('jsonwebtoken');



// Devuelve todos los usuarios registrados en la base de datos
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Trae todos los usuarios
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};


// Crea un nuevo usuario y guarda su contraseña encriptada
const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    // Verificamos si el email ya está en uso
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Creamos un nuevo usuario (la contraseña se encripta en el modelo con un pre-save)
    const nuevoUsuario = new Usuario({ nombre, email, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};


// Verifica el email y la contraseña del usuario y genera un token JWT si es correcto
const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscamos el usuario por su email y pedimos que también nos devuelva la contraseña
    const usuario = await Usuario.findOne({ email }).select('+contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparamos la contraseña ingresada con la encriptada en la base de datos
    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generamos un token JWT con los datos del usuario
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email }, // payload
      'secretoSuperSeguro', // clave secreta (reemplazar por variable de entorno en prod)
      { expiresIn: '1h' } // el token expira en 1 hora
    );

    // Respondemos con el token y los datos del usuario
    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};


// Actualiza los datos de un usuario por su ID
const actualizarUsuario = async (req, res) => {
  try {
    // Busca el usuario por ID y actualiza con los datos recibidos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devuelve el usuario actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar usuario', error });
  }
};


// Elimina un usuario de la base de datos por su ID
const eliminarUsuario = async (req, res) => {
  try {
    // Busca y elimina al usuario
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};


// Exportamos todas las funciones para que puedan usarse en las rutas
module.exports = {
  obtenerUsuarios,
  registrarUsuario,
  loginUsuario,
  actualizarUsuario,
  eliminarUsuario
};