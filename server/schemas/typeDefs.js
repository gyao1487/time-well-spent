const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    userv: Volunteer
    userc: Charity
}
type Volunteer{
    _id:ID
    username:String!
    email:String!
    skills:String
    password:String!
}

type Charity{
    _id:ID
    password:String!
    username:String!
    email:String!
}

type Mutation{
    createVolunteer(username:String!, email:String!, password:String!, skills:String):Auth
    createCharity(username:String!, password:String!, email:String!):Auth
    loginAsVolunteer(username: String!, password: String!,):Auth
    loginAsCharity(username: String!, password: String!,):Auth
  }

  type Query{
    volunteer(volunteerId: ID!): Volunteer
    allVolunteers: [Volunteer]!
    charity(charityId: ID!): Chairty
    allCharity: [Charity]!
}
`
module.exports=typeDefs