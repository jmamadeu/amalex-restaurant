const { Segments, Joi, celebrate } = require('celebrate');
const Product = require('../../models/Product');
const messages = require('../../utils/returnMessages');
const File = require('../../libs/File');

const searchId = async (id) => {
  let response = await Product.getProducts({ id });

  if (response.data.length <= 0) {
    response = messages.notFound({
      message: 'O Produto não existe!',
    });
  }

  return response;
};

module.exports = {
  async verifyBeforeInsert(req, res, next) {
    let response = await Product.getProducts({
      name: req.body.name,
    });

    if (response.data.length > 0) {
      if (req.file) File.deleteFile(req.file.filename, 'products');

      response = messages.alreadyExists({
        message: 'O Producto já existe, cadastre outro!',
      });

      return res.status(response.statusCode).json(response);
    }

    next();
  },

  async verifyBeforeUpdate(req, res, next) {
    let response = await searchId(req.params.id);

    if (!response.success) {
      if (req.file) File.deleteFile(req.file.filename, 'products');
      return res.status(response.statusCode).json(response);
    }

    response = await Product.getProducts({
      name: req.body.name,
    });

    if (response.data.length > 0 && response.data[0].id !== req.params.id) {
      if (req.file) File.deleteFile(req.file.filename, 'products');

      response = messages.alreadyExists({
        message: 'Já existe um produto com esse nome!',
      });

      messages.data = undefined;

      return res.status(response.statusCode).json(response);
    }

    response = await Product.getProducts({ id: req.params.id });

    if (response.data.length <= 0) {
      if (req.file) File.deleteFile(req.file.filename, 'products');

      return res.status(response.statusCode).json(response);
    }

    if (req.file) {
      if (response.data[0].image_id)
        File.deleteFile(response.data[0].image_id, 'products');
    }

    next();
  },

  async verifyIdExists(req, res, next) {
    let response = await searchId(req.params.id);

    if (!response.success) {
      return res.status(response.statusCode).json(response);
    }

    next();
  },
};
