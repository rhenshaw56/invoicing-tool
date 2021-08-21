
exports.up = async function(knex) {
  await knex.schema.createTable('invoices', (table) => {
    table.increments('id').primary();
    table.json('customer').notNullable();
    table.json('products').notNullable();
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('invoices');
};
