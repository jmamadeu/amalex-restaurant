const Token = require('../../app/libs/Token');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admins')
    .del()
    .then(function () {
      // Inserts seed entries

      return knex('admins').insert([
        {
          id: 1,
          name: 'Mateus Alexandre',
          email: 'mateus@gmail.com',
          password: Token.generatePasswordHash('localhost'),
        },
        {
          id: 2,
          name: 'João Amadeu',
          email: 'amadeu@gmail.com',
          password: Token.generatePasswordHash('ghost'),
        },
      ]);
    });
};
