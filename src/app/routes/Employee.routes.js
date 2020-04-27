const routes = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const EmployeeController = require('../controllers/Employee');

routes.use(authMiddleware);

routes.get('/', EmployeeController.index);

routes.post('/', EmployeeController.store);

module.exports = routes;
