export const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!
    name: String
    signUpDate: Date!
  }

  type Profile {
    id: ID!
    name: String
    email: String!
    signUpDate: Date!
  }

  enum AnimalType {
    Cat
    Dog
    Bird
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
    name: String!
    comment: String
    age: Int
    doctor: User
    diseases: [Disease]!
    updatedAt: Date
  }

  type Dog {
    id: ID!
    name: String!
    comment: String
    age: Int
    doctor: User
    diseases: [Disease]!
    updatedAt: Date
  }

  type Bird {
    id: ID!
    name: String!
    comment: String
    age: Int
    doctor: User
    diseases: [Disease]!
    updatedAt: Date
  }

  union Animal = Bird | Dog | Cat

  input AnimalInput {
    doctorId: ID
    diseaseIds: [ID!]
    name: String!
    comment: String
    age: Int
    type: AnimalType!
  }

  input ChangePasswordInput {
    password: String!
    newPassword: String!
  }

  input UpdateProfileInput {
    name: String!
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
    medicines: [Medicine!]!
    diseases: [Disease!]!
  }

  type Subscription {
    updatedAnimal: Animal!
    updatedUser: User!
    updatedMedicine: Medicine!
    updatedDisease: Disease!
  }

  type Mutation {
    profile: ProfileMutations
    addAnimal(input: AnimalInput!): Animal!
    updateAnimal(id: ID!, input: AnimalInput!): Animal!
    addMedicine(input: MedicineInput!): Medicine!
    updateMedicine(id: ID!, input: MedicineInput!): Medicine!
    addDisease(input: DiseaseInput!): Disease!
    updateDisease(id: ID!, input: DiseaseInput!): Disease!
  }
`;
