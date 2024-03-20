
const userTypeDefs = `#graphql
  ##
  # Types
  ##
  type User {
    id: ID!
    name: String!
    email: String!
  }

  ##
  # Inputs
  ##
  input CreateUserInput {
    name: String!
    email: String!
  }

  ##
  # Queries
  ##
  type Query {
    users(
      id: ID,
      name: String,
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

export default userTypeDefs;
