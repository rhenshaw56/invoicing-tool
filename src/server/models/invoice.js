import { Model } from 'objection';
import knex from '../config/knexfile';

Model.knex(knex);

export default class Invoice extends Model {

  static get tableName() {
    return 'invoices'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },
        customer: {
          type: 'object',
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
        product_details: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
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
