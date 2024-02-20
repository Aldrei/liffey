const users = [
  {
    id: 1,
    email: 'user1@email.com',
    username: 'Kate Chopin',
  },
  {
    id: 2,
    email: 'user2@email.com',
    username: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => users,
  },
};

export { resolvers };
