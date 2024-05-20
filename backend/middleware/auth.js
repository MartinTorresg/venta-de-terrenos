const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obtener el token del header
  const token = req.header('x-auth-token');
  console.log('Token recibido:', token); // Log para verificar si el token está presente

  // Verificar si no hay token
  if (!token) {
    console.log('No hay token, autorización denegada');
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  // Verificar token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Token no es válido');
    res.status(401).json({ msg: 'Token no es válido' });
  }
};
