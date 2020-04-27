const uuid = require('uuid');

const dbConnection = require('../../database');
const appConfig = require('../../configs/app');

const File = require('../libs/File');

const messages = require('../utils/returnMessages');
const newId = require('../utils/returnNewId');

class Product {
  static async deleteProduct({ id }) {
    try {
      const { data } = await this.getProducts({ id });
      await dbConnection('products').where('id', id).del();

      if (data[0].image_id) File.deleteFile(data[0].image_id, 'products');

      return messages.deletedSuccessfully({
        message: 'Produto apagado com êxito!',
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }

  static async updateProduct({
    id,
    name,
    quantity,
    price,
    image_id,
    type,
    description,
  }) {
    try {
      const data = await dbConnection('products')
        .where({ id })
        .update({ name, quantity, price, image_id, type, description });

      if (!data) {
        return messages.unknowError({});
      }

      return messages.updatedSuccessfully({
        message: 'Editado com sucesso',
        data: {
          id,
          name,
          quantity,
          price,
          image_id,
          type,
          description,
          image_url: `${appConfig.host_production}/files/products/${image_id}`,
        },
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }

  static async getProducts(filters = {}) {
    try {
      let data = await dbConnection('products').select().where(filters);

      if (!data.length > 0) {
        return messages.foundSuccessfully({
          message: 'Nenhum produto foi encontrado!',
          total: 0,
          data: [],
        });
      }

      data = data.map((product) => ({
        ...product,
        image_url: `${appConfig.host_production}/files/products/${product.image_id}`,
      }));

      return messages.foundSuccessfully({
        message: 'Produto(s) encontrado(s) com sucesso!',
        total: data.length,
        data,
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }

  static async createProduct({
    name,
    quantity,
    price,
    image_id,
    type,
    description,
  }) {
    try {
      const [product] = await dbConnection('products').insert({
        id: uuid.v4(),
        name,
        quantity,
        price,
        image_id,
        type,
        description,
      });

      if (!product) {
        return messages.unknowError({});
      }

      return messages.successfullyCreated({
        message: 'Produto criado com sucesso!',
        data: {
          id: newId,
          name,
          quantity,
          price,
          image_id,
          type,
          description,
          image_url: `${appConfig.host_production}/files/products/${image_id}`,
        },
      });
    } catch (err) {
      console.log(err);
      return messages.unknowError({});
    }
  }
}

module.exports = Product;
