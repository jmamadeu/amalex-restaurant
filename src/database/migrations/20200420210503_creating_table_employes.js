exports.up = function (knex) {
  return knex.schema.createTable('employees', (table) => {
    table.uuid('em_id').primary().notNullable();
    table.string('em_name').notNullable();
    table.string('em_email').notNullable();
    table.string('em_password').notNullable();
    table.string('em_phone').nullable();
    table.string('em_address').notNullable();
    table.string('em_category').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('employees');
};
