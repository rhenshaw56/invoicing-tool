
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('invoices').del()
    .then(function () {
      // Inserts seed entries
      return knex('invoices').insert([
        {
          customer: JSON.stringify({
            fullname: 'Johnb B Routeledge',
            email: 'abe@linc1.com',
            address: 'Linc Way 1',
            pincode: '12345',
          }),
          products: JSON.stringify([{
            name: 'Tennis',
            tax: 0.3,
            price: 200,
            discount: 0.4,
            quantity: 20
          }])
        },
        {
          customer: JSON.stringify({
            fullname: 'John B',
            email: 'abe@linc.com',
            address: 'Linc Way',
            pincode: '12345',
          }),
          products: JSON.stringify([{
            tax: 0.3,
            name: 'Baseball',
            price: 200,
            discount: 0.4,
            quantity: 20
          }])
        },
        {
          customer: JSON.stringify({
            fullname: 'John A',
            email: 'abe@linc.com',
            address: 'Linc Way',
            pincode: '12345',
          }),
          products: JSON.stringify([{
            name: 'Football',
            tax: 0.3,
            price: 200,
            discount: 0.4,
            quantity: 20
          }])
        }
      ]);
    });
};
