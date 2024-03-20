import { Users } from "@/database/models";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const usersResolver = {
  Query: {
    users: async (
      _: any,
      { fields }: any
    ) => {
      try {
        const attrs = fields || ['id', 'name', 'email']

        const dataUsers = await Users.findAll({
          attributes: attrs
        })

        return dataUsers;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to list Users.')
      }
    },
  },
  Mutation: {
    CreateUser: async (_, { input }) => {
      try {
        const newUser = await Users.create(input)
        return newUser
      } catch (error) {
        console.log(error);
        throw new Error('Failed to create User.')
      }
    }
  }
};

export { usersResolver };
