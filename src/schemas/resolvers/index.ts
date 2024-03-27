import { propertiesResolver } from "@/schemas/resolvers/properties";
import { usersResolver } from "@/schemas/resolvers/users";
import { CustomResolver } from "@/services/auth";
import { IResolvers } from "@graphql-tools/utils";

type Resolvers = { [key: string]: CustomResolver }

export interface Schema extends IResolvers {
  Query: Resolvers
  Mutation: any
}

const resolvers: Schema = {
  Query: {
    // ...usersResolver.Query,
    ...propertiesResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
  }
};

export { resolvers };
