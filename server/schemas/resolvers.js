const { AuthenticationError } = require('apollo-server-express');
const { Volunteer, Charity } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query:{
     
      me: async function(parent,args,context ) {
        const foundVolunteer = await Volunteer.findOne({
            _id: context.userv._id ,
        });
    
        if (!foundVolunteer) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        return foundVolunteer;
      },

},
Mutation:{ 
     createVolunteer:async function(parent, args ) {
        const userv = await Volunteer.create(args);
    
        if (!userv) {
            throw new AuthenticationError('You need to be logged in!');
        }
        const token = signToken(userv);
        return {token, userv} ;
      },

      createCharity:async function(parent, args ) {
        const userc = await Charity.create(args);
    
        if (!userc) {
            throw new AuthenticationError('You need to be logged in!');
        }
        const token = signToken(userc);
        return {token, userc} ;
      },
      // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
      // {body} is destructured req.body
       loginAsVolunteer:async function(parent, args) {
        const userv = await Volunteer.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!userv) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        const correctPw = await userv.isCorrectPassword(args.password);
    
        if (!correctPw) {
          
        }
        const token = signToken(userv);
        return{ token, userv };
      },
      loginAsCharity:async function(parent, args) {
        const userc = await Charity.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!userc) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        const correctPw = await userc.isCorrectPassword(args.password);
    
        if (!correctPw) {
          
        }
        const token = signToken(userc);
        return{ token, userc };
      },
      
      
    
      
    }
    

}
module.exports=resolvers