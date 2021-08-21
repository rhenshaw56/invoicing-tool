/* eslint-disable import/no-anonymous-default-export */
export default `
type Customer {
  fullname: String!
  address: String!
  pincode: String!
  email: String!
}
type Product {
  name: String!
  price: Int!
  quantity: Int!
  tax: Float!
  discount: Float!
}

type Invoice {
  id: Int!
  customer: Customer!
  products: [Product]!
}

type CreateInvoiceResponse {
  success: Boolean!
  message: String
}

type InvoiceListResponse {
  invoices: [Invoice]!
}

input CustomerInput {
  fullname: String!
  address: String!
  pincode: String!
  email: String!
}

input ProductInput {
  name: String!
  price: Int!
  quantity: Float!
  tax: Float!
  discount: Float!
}

input InvoiceInput {
  customer: CustomerInput!
  products: [ProductInput]!
}

type Query {
  hello: String
  invoice(id: Int!): Invoice
  invoices: [Invoice]!
}

type Mutation {
  createInvoice(invoice: InvoiceInput): CreateInvoiceResponse!
}
`;
