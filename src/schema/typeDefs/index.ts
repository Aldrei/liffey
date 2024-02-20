const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User]
  }
`;

export { typeDefs };
