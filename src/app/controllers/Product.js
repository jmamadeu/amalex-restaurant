const Product = require('../models/Product');

module.exports = {
  async store(req, res) {
    const response = await Product.createProduct({
      ...req.body,
      image_id: req.file ? req.file.filename : null,
    });

    return res.status(response.statusCode).json(response);
  },

  async index(req, res) {
    const response = await Product.getProducts({});

    return res.status(response.statusCode).json(response);
  },

  async update(req, res) {
    const response = await Product.updateProduct({
      ...req.body,
      id: req.params.id,
      image_id: req.file ? req.file.filename : null,
    });

    return res.status(response.statusCode).json(response);
  },

  async show(req, res) {
    let response = await Product.getProducts({ id: req.params.id });

    response = {
      ...response,
      data: {
        ...response.data[0],
      },
      total: undefined,
    };

    return res.status(response.statusCode).json(response);
  },

  async delete(req, res) {
    const response = await Product.deleteProduct({ id: req.params.id });

    return res.status(response.statusCode).json(response);
  },
};
