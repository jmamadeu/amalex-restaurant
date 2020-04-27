const dbConnection = require('../../database');
const returnMessages = require('../utils/returnMessages');
const Token = require('../libs/Token');

class Admin {
  static async searchAdmin(filters = {}) {
    try {
      const response = await dbConnection('admins').select().where(filters);

      if (response.length > 0) {
        return returnMessages.foundSuccessfully({
          message: 'Admin(s) encontrado(s) com sucesso!',
          data: response,
        });
      }

      return returnMessages.notFound({
        message: 'Não foi encontrado algum registro',
      });
    } catch (err) {
      console.log(err);
      return returnMessages.unknowError({});
    }
  }

  static async verifyLogin(email, password) {
    try {
      let response = await this.searchAdmin({ email });

      if (!response.success) {
        return response;
      }

      const confirmPassword = Token.compareTokenPassword(
        password,
        response.data[0].password
      );

      const admin = {
        ...response.data[0],
        password: undefined,
      };

      if (confirmPassword) {
        const token = Token.generateJWT({ data: { id: admin.id } });

        response = returnMessages.foundSuccessfully({
          message: 'Admin encontrado com êxito',
          data: { ...admin },
          total: 1,
        });

        response = {
          ...response,
          token,
          data: undefined,
          total: undefined,
        };

        return response;
      } else {
        return returnMessages.notFound({
          message: 'Palavra passe incorrecta!',
        });
      }
    } catch (err) {
      console.log(err);
      return returnMessages.unknowError({});
    }
  }
}

module.exports = Admin;
