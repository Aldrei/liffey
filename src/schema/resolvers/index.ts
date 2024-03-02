import { User } from "@/database/create";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: async (_: any,
      { fields }: any
    ) => {
      try {
        const attrs = fields || ['id', 'firstName', 'lastName', 'username', 'email']

        const dataUsers = await User.findAll({
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
        const newUser = await User.create(input)
        return newUser
      } catch (error) {
        console.log(error);
        throw new Error('Failed to create User.')
      }
    }
  }
};

export { resolvers };
