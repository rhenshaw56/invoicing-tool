
export default class CrudService {
  async create(model, invoiceDetail) {
    const { customer, products } = invoiceDetail;

    try {
      await model.query().insert({ customer, products });
      return { success: true }
    } catch(error) {
      throw new Error('An error occured while creating record!')
    }
  }

  async getById(model, id) {
    try {
      const item = await model.query().findById(id);
      return item;
    } catch(error) {
      throw new Error('An error occured while fetching record!')
    }
  }

  async list(model) {
    try {
      const list = await model.query();
      return list;
    } catch(error) {
      throw new Error('An error occured while fetching records!')
    }
  }
}
