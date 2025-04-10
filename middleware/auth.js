const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, 'secretoSuperSeguro');
    req.usuario = verificado; // podés usar esto en tus rutas
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;