// Importamos express para crear el router
const express = require('express');
const router = express.Router();

// Importamos el middleware que verifica si el usuario está autenticado
const verificarToken = require('../middleware/auth');

// Importamos las funciones del controlador de recetas
const {
    obtenerRecetas,
    crearReceta,
    actualizarReceta,
    eliminarReceta
} = require('../controllers/recetaController');


// Obtener todas las recetas (pública)
router.get('/', obtenerRecetas);

// Crear una nueva receta (ruta protegida: solo usuarios con token pueden acceder)
router.post('/', verificarToken, crearReceta);

// Actualizar una receta por ID (actualmente no protegida)
router.put('/:id', actualizarReceta);

// Eliminar una receta por ID (actualmente no protegida)
router.delete('/:id', eliminarReceta);


// Ruta de prueba para verificar si la autenticación funciona correctamente
// Muestra el email del usuario autenticado
router.get('/protegida', verificarToken, (req, res) => {
    res.json({ mensaje: `Hola ${req.usuario.email}, accediste a una ruta protegida.` });
});


// Exportamos el router para que pueda usarse en server.js
module.exports = router;
