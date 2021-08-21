
exports.up = async function(knex) {
  await knex.schema.createTable('invoices', (table) => {
    table.increments('id');
    table.json('customer').notNullable();
    table.json('product_details').notNullable();
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('invoices');
};
