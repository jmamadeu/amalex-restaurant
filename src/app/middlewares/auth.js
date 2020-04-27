const jwt = require('jsonwebtoken');
const authConfig = require('../../configs/auth');
const messages = require('../utils/returnMessages');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const response = messages.authError({ message: 'Token não informado' });
    return res.status(response.statusCode).json(response);
  }

  const parts = token.toString().split(' ');

  if (parts[0] !== 'Bearer' || parts.length !== 2) {
    const response = messages.authError({ message: 'Token Mal Formado' });
    return res.status(response.statusCode).json(response);
  }

  jwt.verify(parts[1], authConfig.secret, (err, decoded) => {
    if (err) {
      const response = messages.authError({ message: 'Token inválido!' });
      return res.status(response.statusCode).json(response);
    }

    next();
  });
};
