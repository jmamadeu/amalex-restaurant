const messages = require('../utils/returnMessages');
const dbConnection = require('../../database');
const Token = require('../libs/Token');
const uuid = require('uuid');

class Employee {
  static async createEmployee({
    name,
    email,
    password,
    phone = null,
    address,
    category,
  }) {
    try {
      const id = uuid.v4();
      password = Token.generatePasswordHash(password);

      const data = {
        em_id: id,
        em_name: name,
        em_email: email,
        em_password: password,
        em_phone: phone,
        em_address: address,
        em_category: category,
      };

      const response = await dbConnection('employees').insert(data);

      if (!response) {
        console.log('test', response);
        return messages.unknowError({});
      }

      return messages.successfullyCreated({
        message: 'Funcionário criado com sucesso!',
        data,
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }

  static async getEmployees({ filters = {} }) {
    try {
      const data = await dbConnection('employees').select().where(filters);

      if (!data.length > 0) {
        return messages.foundSuccessfully({
          message: 'Nenhum funcionário foi encontrado!',
          data: [],
        });
      }

      return messages.foundSuccessfully({
        message: 'Funcionários carregados com sucesso!',
        data,
        total: data.length,
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }

  static async verifyLogin({ email, password }) {
    try {
      let response = await this.getEmployees({ filters: { em_email: email } });

      if (!response.data.length > 0) {
        return messages.notFound({ message: 'O Funcionário não existe!' });
      }

      const confirmPassword = Token.compareTokenPassword(
        password,
        response.data[0].em_password
      );

      const admin = {
        ...response.data[0],
        em_password: undefined,
      };

      if (confirmPassword) {
        const token = Token.generateJWT({ data: { id: admin.id } });

        response = messages.foundSuccessfully({
          message: 'Funcionário encontrado com êxito',
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
        return messages.notFound({
          message: 'Palavra passe incorrecta!',
        });
      }
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }
}

module.exports = Employee;
