const typeDefs = `#graphql
  ##
  # Types
  ##
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  ##
  # Inputs
  ##
  input CreateUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  ##
  # Queries
  ##
  type Query {
    users(
      id: ID,
      firstName: String,
      lastName: String,
      username: String,
      email: String,
      fields: [String!]
    ): [User]
  }

  ##
  # Mutations
  ##
  type Mutation {
    CreateUser(input: CreateUserInput): User!
  }
`;

export { typeDefs };
