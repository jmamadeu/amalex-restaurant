const routes = require('express').Router();

const SessionRoutes = require('./Session.routes');

routes.use('/sessions', SessionRoutes);

module.exports = routes;
