const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovie: [Movie]
    job: [Job]
  }

  type Job {
    id: ID!
    role: String!
  }

  type Movie {
    id: ID!
    name: String!
    isInTheaters: Boolean!
    yearOfPublication: Int!
  }

  type Query {
    users: [User!]!
    getSecondUser: User!
    getFirstUser: User!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
    getFirstMovie: Movie!
    jobs: [Job!]!
    job(id: ID!): Job!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = GERMANY
  }
  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }
  input DeleteUserInput {
    id: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUsernameInput!): User!
    deleteUser(input: DeleteUserInput!): User!
  }

  enum Nationality {
    INDIA
    CANADA
    BRAZIL
    GERMANY
    CHILE
  }
`;

module.exports = { typeDefs };
