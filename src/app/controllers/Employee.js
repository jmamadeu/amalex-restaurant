const Employee = require('../models/Employee');

module.exports = {
  async index(req, res) {
    const response = await Employee.getEmployees({ filters: {} });

    return res.status(response.statusCode).json(response);
  },

  async store(req, res) {
    const response = await Employee.createEmployee({ ...req.body });

    return res.status(response.statusCode).json(response);
  },
};
