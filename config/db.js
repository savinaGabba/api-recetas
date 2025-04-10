// Importamos Mongoose, la librería para interactuar con MongoDB desde Node.js
const mongoose = require('mongoose');

// Función asincrónica para conectar a la base de datos
const connectDB = async () => {
  try {
    // Conexión a MongoDB usando mongoose.connect
    // 'mongodb://127.0.0.1:27017/recetasdb' → URL de tu base local y nombre de la base: recetasdb
    await mongoose.connect('mongodb://127.0.0.1:27017/recetasdb', {
      useNewUrlParser: true, // Usa el nuevo parser de URL
      useUnifiedTopology: true // Usa el nuevo motor de descubrimiento de servidores
    });

    // Si todo sale bien, muestra mensaje en consola
    console.log('Conectado a MongoDB');
  } catch (error) {
    // Si ocurre un error, lo mostramos en consola
    console.error('Error al conectar a MongoDB:', error.message);

    // Forzamos el cierre de la app con código 1 (error)
    process.exit(1);
  }
};

// Exportamos la función para poder usarla en server.js
module.exports = connectDB;
