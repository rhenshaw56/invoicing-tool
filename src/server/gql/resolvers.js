/* eslint-disable import/no-anonymous-default-export */
export default  {
  Query: {
    invoices: (_, { id }, { models, dataSources }) => {
      return dataSources.list(models.Invoice);
    },
    invoice: (_, { id }, { models, dataSources }) => {
      return dataSources.getById(models.Invoice, id)
    },
  },
  Mutation: {
    createInvoice: (_, { invoice }, { models, dataSources }) => {
      return dataSources.create(models.Invoice, invoice);
    }
  }

}
