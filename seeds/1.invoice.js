
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('invoices').insert([
        {id: 1, customer_details: {}, product_details: {}},
        {id: 2, customer_details: {}, product_details: {}},
        {id: 3, customer_details: {}, product_details: {}}
      ]);
    });
};
