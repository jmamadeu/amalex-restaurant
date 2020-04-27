const Token = require('../../app/libs/Token');
const uuid = require('uuid');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('employees')
    .del()
    .then(function () {
      // Inserts seed entries

      return knex('employees').insert([
        {
          em_id: uuid.v4(),
          em_name: 'Mateus Alexandre',
          em_email: 'mateus@gmail.com',
          em_password: Token.generatePasswordHash('localhost'),
          em_phone: '+244933678415',
          em_address: 'Distrito do Kilamba, Belas, Luanda, Angola',
          em_category: 'admin',
        },
      ]);
    });
};
