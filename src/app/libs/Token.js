const bcryp = require('bcryptjs');
const authConfig = require('../../configs/auth');
const jwt = require('jsonwebtoken');

class Token {
  static generatePasswordHash(password) {
    return bcryp.hashSync(password, 10);
  }

  static generateJWT({ data = {}, expires = 86400 }) {
    const token = jwt.sign({ ...data }, authConfig.secret, {
      expiresIn: expires,
    });

    return token;
  }

  static compareTokenPassword(password, tokenPassword) {
    return bcryp.compareSync(password, tokenPassword);
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          reject(returnMessages.errorAuthorization('Token inválido!'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

module.exports = Token;
