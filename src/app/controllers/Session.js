const Admin = require('../models/Admin');
const Token = require('../libs/Token');

module.exports = {
  async store(req, res) {
    let response = await Admin.verifyLogin(req.body.email, req.body.password);

    return res.status(response.statusCode).json(response);
  },
};
