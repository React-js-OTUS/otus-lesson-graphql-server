export const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!
    name: String!
    signUpDate: Date!
  }

  type Profile {
    id: ID!
    name: String!
    email: String!
    signUpDate: Date!
  }

  type Query {
    profile: Profile
  }

  input ChangePasswordInput {
    password: String!
    newPassword: String!
  }

  input UpdateProfileInput {
    name: String
  }

  type AuthResult {
    token: String!
  }

  type ResetPassword {
    success: Boolean!
  }

  type ProfilePasswordMutations {
    change(input: ChangePasswordInput!): ResetPassword!
  }

  type ProfileMutations {
    signup(email: String!, password: String!): AuthResult!
    signin(email: String!, password: String!): AuthResult!
    update(input: UpdateProfileInput!): Profile!
    password: ProfilePasswordMutations
  }

  type Mutation {
    profile: ProfileMutations
  }
`;
