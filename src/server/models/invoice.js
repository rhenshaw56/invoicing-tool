import knex from 'knex';
import { Model } from 'objection';
import knexfile from '../../../knexfile';

Model.knex(knex(knexfile));

export default class Invoice extends Model {

  static get tableName() {
    return 'invoices'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['customer', 'products'],

      properties: {
        id: { type: 'integer' },
        customer: {
          type: 'object',
          required: ['fullname', 'email'],
          properties: {
            fullname: { type: 'string' },
            address: { type: 'string' },
            pincode: { type: 'string' },
            email: {
              type: "string",
              format: "email"
            }
          }
        },
        products: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['name', 'price', 'quantity'],
            properties: {
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' },
              tax: {
                type: 'number',
                maximum: 1,
                minimum: 0
              },
              discount: {
                type: 'number',
                maximum: 1,
                minimum: 0
              }
            }
          }
        }
      }
    };
  }
}
