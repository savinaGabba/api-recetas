// Importamos express para crear el router
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador de usuarios
const {
    obtenerUsuarios,
    registrarUsuario,
    loginUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarioController');


// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Iniciar sesión (login)
router.post('/login', loginUsuario);

// Actualizar un usuario por ID
router.put('/:id', actualizarUsuario);

// Eliminar un usuario por ID
router.delete('/:id', eliminarUsuario);


// Exportamos el router para usarlo en server.js
module.exports = router;
