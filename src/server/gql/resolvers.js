/* eslint-disable import/no-anonymous-default-export */
export default  {
  Query: {
    hello: (parent, args, context, info) => {
      return 'Hello World!'
    }
  }

}
