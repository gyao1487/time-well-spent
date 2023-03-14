const { Schema, model } = require('mongoose');



const googleUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    jti: {
      type: String,
      required: true,
    },
    sub: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    skills:{
        type: String,
        require: false,
    }
   },
);

const GoogleVolunteer = model('GoogleVolunteer', googleUserSchema);

module.exports = GoogleVolunteer;