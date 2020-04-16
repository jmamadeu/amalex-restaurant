const statesCode = {
  ok: 200,
  conflit: 409,
  badRequest: 400,
  internalError: 500,
};

module.exports = {
  unknowError({ message = 'Aconteceu um erro inesperado, tente novamente!' }) {
    return {
      statusCode: statesCode.internalError,
      message,
      success: false,
    };
  },

  foundSuccessfully({ message = '', statusCode = 200, data = [], total = 1 }) {
    return {
      message,
      statusCode,
      data,
      total,
      success: true,
    };
  },

  notFound({ message = 'Não encontrado' }) {
    return {
      message,
      statusCode: statesCode.badRequest,
      success: false,
    };
  },
};
