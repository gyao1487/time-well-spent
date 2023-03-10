const { gql } = require('apollo-server-express');

const typeDefs = gql`

enum UserType {
    VOLUNTEER
    CHARITY
  }
  
  interface User {
    _id: ID!
    username: String!
    email: String!
    usertype: UserType!
  }
  
  type Volunteer implements User {
    _id: ID!
    username: String!
    email: String!
    usertype: UserType!
    password: String!
    skills: String!
  }
  
  type Charity implements User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    usertype: UserType!
    charityName: String!
  }
  
  type Auth {
    token: String
    user: User
  }
  
  type Query {
    getSingleUser(username: String!): User
    me: User
  }
  
  type Mutation {
    createVolunteer(username: String!, email: String!, password: String! skill: String!): Auth
    createCharity(username: String!, email: String!, password: String!, charityName: String!): Auth
    login(email: String!, password: String!): Auth
  }`
module.exports=typeDefs