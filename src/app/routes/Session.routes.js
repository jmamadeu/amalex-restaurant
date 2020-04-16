const routes = require('express').Router();

const SessionController = require('../controllers/Session');

routes.post('/', SessionController.store);

module.exports = routes;
