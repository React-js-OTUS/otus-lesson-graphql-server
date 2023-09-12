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

  enum AnimalType {
    cat
    dog
    bird
  }

  enum DiseaseType {
    cold
    broken
    parasites
    stomach
  }

  input DiseaseInput { 
    type: DiseaseType!
    name: String!
    desc: String!
  }

  type Disease { 
    id: ID!
    type: DiseaseType!
    name: String!
    desc: String!
  }

  input MedicineInput {
    name: String!
    heal: [DiseaseType!]!
  }

  type Medicine {
    id: ID!
    name: String!
    heal: [DiseaseType!]!
  }

  type Cat {
    id: ID!
    name: String
    comment: String
    age: String
    doctor: User!
    disease: [Disease]!
    updatedAt: Date
  }

  type Dog {
    id: ID!
    name: String
    comment: String
    age: String
    doctor: User!
    disease: [Disease]!
    updatedAt: Date
  }

  type Bird {
    id: ID!
    name: String
    comment: String
    age: String
    doctor: User!
    disease: [Disease]!
    updatedAt: Date
  }

  union Animal = Bird | Dog | Cat

  input AddAnimalInput {
    doctorId: ID
    diseaseIds: [ID!]
    name: String
    comment: String
    age: String
  }

  input UpdateAnimalInput {
    id: ID!
    doctorId: ID
    diseaseIds: [ID!]
    name: String
    comment: String
    age: String
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

  type Query {
    profile: Profile
    animals: [Animal!]!
    users: [User!]!
  }

  type Subscription {
    updatedAnimal: Animal!
    updatedUser: User!
  }

  type Mutation {
    profile: ProfileMutations
    addAnimal(input: AddAnimalInput): Animal!
    updateAnimal(input: UpdateAnimalInput): Animal!
  }
`;
