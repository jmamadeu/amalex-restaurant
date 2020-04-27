exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable();
    table.integer('quantity').nullable();
    table.decimal('price').nullable();
    table.string('image_id').nullable();
    table.string('type').nullable();
    table.string('description').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
