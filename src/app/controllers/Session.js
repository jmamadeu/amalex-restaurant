const Employee = require('../models/Employee');
const Token = require('../libs/Token');

module.exports = {
  async store(req, res) {
    let response = await Employee.verifyLogin({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(response.statusCode).json(response);
  },
};
