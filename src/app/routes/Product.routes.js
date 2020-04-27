const routes = require('express').Router();
const multer = require('multer');

const configUpload = require('../../configs/upload');
const upload = multer(configUpload.product_img);

const ProductController = require('../controllers/Product');

const ProductValidator = require('../middlewares/validations/Product');

const authMiddleware = require('../middlewares/auth');

routes.use(authMiddleware);

routes.get('/', ProductController.index);
routes.get('/:id', ProductValidator.verifyIdExists, ProductController.show);

routes.post(
  '/',
  upload.single('image'),
  ProductValidator.verifyBeforeInsert,
  ProductController.store
);

routes.put(
  '/:id',
  upload.single('image'),
  ProductValidator.verifyBeforeUpdate,
  ProductController.update
);

routes.delete(
  '/:id',
  ProductValidator.verifyIdExists,
  ProductController.delete
);

module.exports = routes;
