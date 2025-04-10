// Importamos Express, el framework para crear el servidor
const express = require('express');

// Importamos la función que conecta a la base de datos MongoDB
const connectDB = require('./config/db');

// Inicializamos la aplicación de Express
const app = express();

// Definimos el puerto en el que va a correr el servidor
// Si no está definido en una variable de entorno, usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Conectamos a la base de datos
connectDB();

// Middleware que permite leer datos en formato JSON en las peticiones
app.use(express.json());

// Importamos las rutas de usuarios y recetas
const usuarioRoutes = require('./routes/usuarioRoutes');
const recetaRoutes = require('./routes/recetaRoutes');

// Usamos las rutas: cuando llegan peticiones a /api/usuarios o /api/recetas,
// las redirige a los archivos correspondientes
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/recetas', recetaRoutes);

// Iniciamos el servidor y mostramos un mensaje en consola cuando está corriendo
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

//  Ruta de prueba para verificar que el servidor responde
// Si accedés a http://localhost:3000/ping devuelve "pong"
app.get('/ping', (req, res) => res.send('pong'));
