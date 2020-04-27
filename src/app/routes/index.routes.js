const routes = require('express').Router();

const SessionRoutes = require('./Session.routes');
const ProductRoutes = require('./Product.routes');
const EmployeeRoutes = require('./Employee.routes');

routes.use('/sessions', SessionRoutes);
routes.use('/products', ProductRoutes);
routes.use('/employees', EmployeeRoutes);

module.exports = routes;
