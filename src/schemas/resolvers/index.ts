import { propertiesResolver } from "@/schemas/resolvers/properties";
import { usersResolver } from "@/schemas/resolvers/users";

const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...propertiesResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
  }
};

export { resolvers };
