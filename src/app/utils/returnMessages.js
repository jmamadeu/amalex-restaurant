const statesCode = {
  ok: 200,
  conflit: 409,
  badRequest: 400,
  internalError: 500,
  unauthorized: 401,
};

module.exports = {
  deletedSuccessfully({ message = '' }) {
    return {
      message,
      statusCode: statesCode.ok,
      success: true,
    };
  },

  authError({ message = 'Erro na autenticação' }) {
    return {
      statusCode: statesCode.unauthorized,
      message,
      success: false,
    };
  },

  updatedSuccessfully({ message = '', data = {} }) {
    return {
      statusCode: statesCode.ok,
      message,
      success: true,
      data,
    };
  },

  unknowError({ message = 'Aconteceu um erro inesperado, tente novamente!' }) {
    return {
      statusCode: statesCode.internalError,
      message,
      success: false,
    };
  },

  foundSuccessfully({ message = '', statusCode = 200, data = [], total = 0 }) {
    return {
      message,
      statusCode,
      data,
      total,
      success: true,
    };
  },

  notFound({ message = 'Não encontrado!' }) {
    return {
      message,
      statusCode: statesCode.badRequest,
      success: false,
    };
  },

  successfullyCreated({ message = 'Criado com sucesso!', data = {} }) {
    return {
      message,
      statusCode: statesCode.ok,
      success: true,
      data,
    };
  },

  alreadyExists({ message = 'O registo já existe!' }) {
    return {
      message,
      success: false,
      statusCode: statesCode.conflit,
    };
  },
};
