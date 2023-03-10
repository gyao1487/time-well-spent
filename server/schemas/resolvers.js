const { AuthenticationError } = require('apollo-server-express');
const { User, Volunteer, Charity } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
  User: {
    __resolveType(user, context, info) {
      if (user.usertype === 'VOLUNTEER') {
        return 'Volunteer';
      } else if (user.usertype === 'CHARITY') {
        return 'Charity';
      } else {
        return new AuthenticationError('Must have User Type');
      }
    }
  },

  Query: {
    getSingleUser: async function(parent, args, context) {
      const foundUser = await User.findOne({
        $or: [{ _id: context.user._id }, { username: args.username }],
      });

      if (!foundUser) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return foundUser;
    },

    me: async function(parent, args, context) {
      const foundUser = await User.findOne({
        _id: context.user._id,
      });

      if (!foundUser) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return foundUser;
    },
  },

  Mutation: {
    createVolunteer: async function(parent, args) {
      const { username, email, password } = args;
      // Hash the password before storing it
      
      const newVolunteer = await Volunteer.create({ username, email, password,skills, usertype: 'VOLUNTEER' });

      if (!newVolunteer) {
        throw new AuthenticationError('Error creating volunteer');
      }

      const token = signToken(newVolunteer);
      return { token, user: newVolunteer };
    },

    createCharity: async function(parent, args) {
      const { username, email, password,  } = args;
      
      const newChartiy = await Charity.create({ username, email, password, charityName, usertype: 'CHARITY' });

      if (!newChartiy) {
        throw new AuthenticationError('Error creating volunteer');
      }

      const token = signToken(newChartiy);
      return { token, user: newChartiy };
    },
  },
} 
module.exports=resolvers