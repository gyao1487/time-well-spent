const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    user:User
}
type User{
    username:String!
    email:String!
}


type Query{
    getSingleUser(username:String):User
}
type Mutation{
    createUser(username:String!,email:String!,password:String!):Auth
    login(email: String!, password: String!,):Auth
  }
`
module.exports=typeDefs